
## Endpoints de la API

### Citas

- **Crear Cita**
  - **URL:** `/api/appointments/createAppointment`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "date": "2025-02-15T10:00:00.000Z",
      "status": "CREATED",
      "pet": "<pet_id>",
      "user": "<user_id>"
    }
    ```
  
- **Obtener Citas por Usuario**
  - **URL:** `/api/appointments/user/:uid`
  - **Método:** `GET`
  - **URL Params:**
    - `uid`: ID del usuario.
  
- **Actualizar Cita**
  - **URL:** `/api/appointments/update/:citaId`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "date": "2025-02-16T10:00:00.000Z",
      "status": "ACCEPTED",
      "description": "Visita para adopción"
    }
    ```
  
- **Cancelar Cita**
  - **URL:** `/api/appointments/cancel/:citaId`
  - **Método:** `PATCH`

### Usuarios

- **Registrar Usuario**
  - **URL:** `/api/users/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `/api/users/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Obtener Usuario por ID**
  - **URL:** `/api/users/findUser/:uid`
  - **Método:** `GET`
  - **URL Params:**
    - `uid`: ID del usuario.

- **Eliminar Usuario**
  - **URL:** `/api/users/deleteUser/:uid`
  - **Método:** `DELETE`
  - **URL Params:**
    - `uid`: ID del usuario.

- **Actualizar Contraseña del Usuario**
  - **URL:** `/api/users/updatePassword/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    {
      "newPassword": "string"
    }
    ```

- **Actualizar Información del Usuario**
  - **URL:** `/api/users/updateUser/:uid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "email": "string"
    }
    ```

- **Actualizar Foto del Usuario**
  - **URL:** `/api/users/updatePhoto/:uid`
  - **Método:** `PATCH`
  - **Cuerpo (multipart/form-data):**
    - `profilePicture`: Foto de perfil.

### Mascotas

- **Registrar Mascota**
  - **URL:** `/api/pets/addPet`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "age": "number",
      "type": "string",
      "breed": "string"
    }
    ```

- **Obtener Mascota por ID**
  - **URL:** `/api/pets/findPet/:id`
  - **Método:** `GET`
  - **URL Params:**
    - `id`: ID de la mascota.

- **Eliminar Mascota**
  - **URL:** `/api/pets/deletePet/:id`
  - **Método:** `DELETE`
  - **URL Params:**
    - `id`: ID de la mascota.

- **Actualizar Información de la Mascota**
  - **URL:** `/api/pets/updatePet/:id`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "age": "number",
      "type": "string",
      "breed": "string"
    }
    ```

## Autenticación y Autorización

### Registro de Usuario

- **Método:** `POST`
- **URL:** `/api/auth/register`
- **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string",
      "profilePicture": "archivo_imagen"
    }
    ```

### Login de Usuario

- **Método:** `POST`
- **URL:** `/api/auth/login`
- **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

## Ejemplos de Respuestas

### Respuesta Exitosa para la Creación de una Cita
```json
{
  "success": true,
  "msg": "Cita creada exitosamente",
  "appointment": {
    "_id": "67aad6cd3870a4aaaf27d8d7",
    "date": "2025-02-15T10:00:00.000Z",
    "status": "CREATED",
    "pet": {
      "_id": "67aad6685ceb0cf4849d96e5",
      "name": "Max",
      "type": "Dog"
    },
    "user": {
      "_id": "67aad16bfb4ce9292c386c40",
      "name": "Juan Pérez",
      "email": "juan@example.com"
    }
  }
}
