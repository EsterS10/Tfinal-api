// src/models/logAuditoria.js
// Modelo Sequelize para representar la tabla "logs_auditoria".
// Esta tabla almacena los cambios realizados en usuarios y roles,
// gracias a los triggers definidos directamente en la base de datos.

import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

// Definición del modelo "LogAuditoria"
export const LogAuditoria = sequelize.define(
  'logs_auditoria',                   // Nombre interno del modelo
  {
    // ID autoincremental para registro de auditoría
    id: { 
      type: DataTypes.BIGINT, 
      primaryKey: true, 
      autoIncrement: true 
    },

    // Nombre de la tabla afectada por la operación (usuarios o roles)
    tabla: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },

    // Tipo de operación realizada según el trigger (INSERT, UPDATE, DELETE)
    operacion: { 
      type: DataTypes.ENUM('INSERT', 'UPDATE', 'DELETE'), 
      allowNull: false 
    },

    // ID del registro afectado en la tabla principal
    registro_id: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },

    // Datos previos del registro (solo para UPDATE y DELETE)
    datos_previos: { 
      type: DataTypes.JSON 
    },

    // Datos nuevos del registro (solo para INSERT y UPDATE)
    datos_nuevos: { 
      type: DataTypes.JSON 
    },

    // Fecha de ejecución del trigger
    ejecutado_en: { 
      type: DataTypes.DATE, 
      allowNull: false, 
      defaultValue: DataTypes.NOW 
    }
  },
  {
    tableName: 'logs_auditoria',      // Nombre real en la base de datos

    // Sequelize normalmente crea createdAt y updatedAt,
    // pero esta tabla ya trae su propio timestamp.
    updatedAt: false,                 // No existe columna "updatedAt"
    createdAt: 'ejecutado_en'         // El timestamp se almacena en "ejecutado_en"
  }
);
