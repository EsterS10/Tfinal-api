// src/models/usuario.js
// Modelo Sequelize para la tabla "usuarios".
// Define la estructura de los usuarios y sus relaciones con la tabla "roles".

import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Rol } from './rol.js';

// Definición del modelo "Usuario"
export const Usuario = sequelize.define(
  'usuarios',                         // Nombre interno del modelo
  {
    // Identificador único autoincremental
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },

    // Nombre de usuario único dentro del sistema
    usuario: { 
      type: DataTypes.STRING(50), 
      allowNull: false, 
      unique: true 
    },

    // Nombres del usuario (no pueden estar vacíos)
    nombre: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },

    // Apellidos del usuario (no pueden estar vacíos)
    apellido: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },

    // Contraseña almacenada en formato hasheado (bcrypt)
    contrasena: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
    },

    // Número de contacto (opcional)
    celular: { 
      type: DataTypes.STRING(20) 
    },

    // Rol asignado (llave foránea obligatoria)
    rol_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },

    // Correo electrónico único y obligatorio
    correo: { 
      type: DataTypes.STRING(150), 
      allowNull: false, 
      unique: true 
    },

    // Estado del usuario dentro de la plataforma
    estado: { 
      type: DataTypes.ENUM('Activo', 'Inactivo'), 
      allowNull: false, 
      defaultValue: 'Activo' 
    }
  },
  {
    tableName: 'usuarios'             // Nombre de la tabla real en MySQL
    // Los timestamps (creado_en / actualizado_en) se activan desde db.js
  }
);

// ---------------------------------------------
// Relaciones entre Usuario y Rol
// ---------------------------------------------

// Un usuario pertenece a un único rol
Usuario.belongsTo(Rol, { 
  foreignKey: 'rol_id', 
  as: 'rol' 
});

// Un rol puede tener varios usuarios asociados
Rol.hasMany(Usuario, { 
  foreignKey: 'rol_id', 
  as: 'usuarios' 
});
