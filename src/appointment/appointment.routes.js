import { Router } from "express";
import { saveAppointment, getAppointmentsByUserId, updateAppointment, cancelAppointment } from "./appointment.controller.js";
import { createAppointmentValidator, getAppointmentsByUserIdValidator, updateAppointmentValidator, cancelAppointmentValidator } from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/user/:uid", getAppointmentsByUserIdValidator, getAppointmentsByUserId);

router.put("/update/:citaId",updateAppointmentValidator, updateAppointment);

router.patch("/cancel/:citaId",cancelAppointmentValidator, cancelAppointment);

export default router;