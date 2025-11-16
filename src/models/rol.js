// src/models/rol.js
// Modelo Sequelize para la tabla "roles".
// Representa la estructura de la tabla y se utiliza para las relaciones con usuarios.

import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

// Definición del modelo "Rol"
export const Rol = sequelize.define(
  'roles',                                // Nombre interno del modelo
  {
    // ID autoincremental y clave primaria
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },

    // Nombre del rol (ej: Administrador, Ventas, Cocina, etc.)
    nombre: { 
      type: DataTypes.STRING(50), 
      allowNull: false, 
      unique: true 
    },

    // Descripción opcional del rol
    descripcion: { 
      type: DataTypes.STRING(200) 
    }
  },
  {
    tableName: 'roles'                    // Nombre real de la tabla en MySQL
    // timestamps activados automáticamente (creado_en / actualizado_en)
    // debido a la configuración definida en db.js
  }
);
