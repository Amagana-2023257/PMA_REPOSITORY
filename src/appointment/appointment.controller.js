import Pet from "../pet/pet.model.js";
import Appointment from "../appointment/appointment.model.js";
import mongoose from 'mongoose';

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;
    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",
      });
    }

    // Validar si el ID de la mascota es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(data.pet)) {
      return res.status(400).json({
        success: false,
        msg: "ID de mascota no válido",
      });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({
        success: false,
        msg: "No se encontró la mascota",
      });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Error al crear la cita",
      error,
    });
  }
};

export const getAppointmentsByUserId = async (req, res) => {
  try {
    const { uid } = req.params;

    // Verificar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(uid)) {
      return res.status(400).json({
        success: false,
        msg: "ID de usuario no válido",
      });
    }

    // Buscar las citas del usuario con el `uid` proporcionado
    const appointments = await Appointment.find({ user: uid })
      .populate("pet", "name type")  // Esto te da el nombre y tipo de la mascota
      .populate("user", "name email");  // Esto te da el nombre y email del usuario

    // Si no se encuentran citas, responder con un mensaje de error
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No se encontraron citas para este usuario",
      });
    }

    // Si se encuentran citas, devolverlas
    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error al obtener las citas: ", error);
    return res.status(500).json({
      success: false,
      msg: "Error al obtener las citas",
      error: error.message,
    });
  }
};


export const updateAppointment = async (req, res) => {
  try {
    const { citaId } = req.params; 
    const { date, description, status } = req.body;

    const appointment = await Appointment.findById(citaId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        msg: "Cita no encontrada",
      });
    }

    appointment.date = date ? new Date(date) : appointment.date;
    appointment.description = description || appointment.description;
    appointment.status = status || appointment.status;

    await appointment.save(); 

    return res.status(200).json({
      success: true,
      msg: "Cita actualizada correctamente",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error al actualizar la cita",
      error: error.message,
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { citaId } = req.params; 

    const appointment = await Appointment.findById(citaId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        msg: "Cita no encontrada",
      });
    }

    appointment.status = 'CANCELLED';

    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: "Cita cancelada correctamente",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error al cancelar la cita",
      error: error.message,
    });
  }
};
