// src/validators/usuarios.js
// Validadores para las operaciones relacionadas con Usuarios.
// Se utiliza express-validator para asegurar que los datos recibidos
// cumplan con los requisitos de formato, longitud y consistencia del sistema.

import { body, param } from 'express-validator';

/**
 * Validación para crear un nuevo usuario.
 *
 * Reglas:
 *  - usuario: obligatorio, string entre 3 y 50 caracteres
 *  - nombre: obligatorio, no vacío
 *  - apellido: obligatorio, no vacío
 *  - contrasena: obligatorio, mínimo 8 caracteres
 *  - celular: opcional, string entre 7 y 20 caracteres
 *  - rol_id: obligatorio, entero >= 1
 *  - correo: obligatorio, formato email válido
 *  - estado: opcional, debe ser Activo o Inactivo
 */
export const crearUsuarioVal = [
  body('usuario')
    .isString()
    .trim()
    .isLength({ min: 3, max: 50 }),

  body('nombre')
    .isString()
    .trim()
    .notEmpty(),

  body('apellido')
    .isString()
    .trim()
    .notEmpty(),

  body('contrasena')
    .isString()
    .trim()
    .isLength({ min: 8 }),

  body('celular')
    .optional()
    .isString()
    .isLength({ min: 7, max: 20 }),

  body('rol_id')
    .isInt({ min: 1 }),

  body('correo')
    .isEmail()
    .normalizeEmail(),

  body('estado')
    .optional()
    .isIn(['Activo', 'Inactivo'])
];

/**
 * Validación para el parámetro :id en rutas como:
 *  - GET /usuarios/:id
 *  - PUT /usuarios/:id
 *  - DELETE /usuarios/:id
 *
 * Debe ser un número entero positivo.
 */
export const idParamVal = [
  param('id')
    .isInt({ min: 1 })
];

/**
 * Validación para actualizar un usuario.
 * Todos los campos son opcionales, pero si vienen deben ser válidos.
 *
 * Regla general:
 *  - Si el campo se envía, se valida.
 *  - Si no se envía, no genera error (permite actualizaciones parciales).
 */
export const actualizarUsuarioVal = [
  ...idParamVal, // Reutiliza la validación de :id

  body('usuario')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 50 }),

  body('nombre')
    .optional()
    .isString()
    .trim()
    .notEmpty(),

  body('apellido')
    .optional()
    .isString()
    .trim()
    .notEmpty(),

  body('contrasena')
    .optional()
    .isString()
    .isLength({ min: 8 }),

  body('celular')
    .optional()
    .isString()
    .isLength({ min: 7, max: 20 }),

  body('rol_id')
    .optional()
    .isInt({ min: 1 }),

  body('correo')
    .optional()
    .isEmail()
    .normalizeEmail(),

  body('estado')
    .optional()
    .isIn(['Activo', 'Inactivo'])
];
