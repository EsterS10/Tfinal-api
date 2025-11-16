// src/middlewares/errorHandler.js
// Middleware global para manejo de errores en la API.
// Este middleware captura cualquier error que ocurra en las rutas o controladores
// y devuelve una respuesta JSON clara y consistente al cliente.

export function errorHandler(err, req, res, next) {
  // Log interno para depuración en el servidor
  console.error('🔴 Error:', err);

  // Si el error tiene un código de estado definido, se utiliza.
  // De lo contrario, se responde con 500 (Internal Server Error).
  const status = err.status || 500;

  // Respuesta estándar de error hacia el cliente
  res.status(status).json({
    mensaje: err.message || 'Error interno del servidor'

    // Si quisieras mostrar el stack trace en ambiente de desarrollo:
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}
