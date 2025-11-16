// src/db.js
// Configuración de la conexión a MySQL usando Sequelize.

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carga de variables de entorno desde el archivo .env
dotenv.config();

// Desestructuramos las variables de entorno necesarias para la BD
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

// Instancia principal de Sequelize, que se usará en los modelos
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false, // desactiva los logs SQL en consola
  define: {
    // Activa timestamps automáticos y personaliza los nombres de columnas
    timestamps: true,
    createdAt: 'creado_en',     // columna para fecha de creación
    updatedAt: 'actualizado_en' // columna para fecha de actualización
  }
});

// Función auxiliar para probar la conexión a la base de datos
export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL exitosa');
  } catch (err) {
    console.error('❌ Error de conexión a MySQL:', err.message);
    // Si no se puede conectar, se cierra el proceso para no dejar el servidor "medio vivo"
    process.exit(1);
  }
}
