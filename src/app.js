// src/app.js
// Punto de entrada de la API Tfinal-api.
// Aquí se configura Express, se conectan las rutas y se inicia el servidor HTTP.

import express from 'express';
import dotenv from 'dotenv';

// Conexión y sincronización con la base de datos (Sequelize + MySQL)
import { testConnection, sequelize } from './db.js';

// Rutas principales de la API
import usuariosRouter from './routes/usuarios.js';
import rolesRouter from './routes/roles.js';
import logsRouter from './routes/logs.js';
import statsRouter from './routes/estadisticas.js';

// Middleware de manejo global de errores
import { errorHandler } from './middlewares/errorHandler.js';

// Carga de variables de entorno definidas en el archivo .env
dotenv.config();

const app = express();

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// -------------------------------
// Rutas de la API
// -------------------------------

// Rutas para la gestión de usuarios
app.use('/usuarios', usuariosRouter);

// Rutas para la gestión de roles
app.use('/roles', rolesRouter);

// Rutas para consultar la auditoría (logs de la BD)
app.use('/auditoria', logsRouter);

// Rutas para estadísticas generales del sistema
app.use('/estadisticas', statsRouter);

// Endpoint de salud del servicio (útil para saber si la API está viva)
app.get('/health', (req, res) =>
  res.json({
    ok: true,
    mensaje: 'API en funcionamiento',
    timestamp: new Date().toISOString()
  })
);

// Middleware centralizado de manejo de errores
app.use(errorHandler);

// Puerto en el que escuchará la API (desde .env o 3001 por defecto)
const PORT = process.env.PORT || 3001;

// Función de arranque de la aplicación
async function bootstrap() {
  // Verificar que la conexión a la base de datos funcione correctamente
  await testConnection();

  // Registrar los modelos en Sequelize sin modificar el esquema definido en SQL
  await sequelize.sync({ alter: false });

  // Iniciar el servidor HTTP
  app.listen(PORT, () => console.log(`🚀 API escuchando en http://localhost:${PORT}`));
}

// Llamada inicial para levantar la aplicación
bootstrap();
