// src/validators/roles.js
// Validadores para las operaciones relacionadas con Roles.
// Se utiliza express-validator para asegurar que los datos recibidos
// cumplan con el formato y requisitos del sistema.

import { body, param } from 'express-validator';

/**
 * Validación para crear un nuevo rol.
 * Requisitos:
 *  - nombre: obligatorio, string, entre 2 y 50 caracteres
 *  - descripcion: opcional, string, máximo 200 caracteres
 */
export const crearRolVal = [
  body('nombre')
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 }),
  
  body('descripcion')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 200 })
];

/**
 * Validación para el parámetro :id en rutas como:
 *  - GET /roles/:id
 *  - PUT /roles/:id
 *  - DELETE /roles/:id
 *
 * Debe ser un número entero mayor o igual a 1.
 */
export const idParamRolVal = [
  param('id')
    .isInt({ min: 1 })
];

/**
 * Validación para actualizar un rol existente.
 * Todos los campos son opcionales, pero si vienen deben cumplir:
 *  - nombre: string de 2–50 caracteres
 *  - descripcion: string de máximo 200 caracteres
 */
export const actualizarRolVal = [
  ...idParamRolVal,   // Reusa la validación del parámetro :id

  body('nombre')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 }),
  
  body('descripcion')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 200 })
];

