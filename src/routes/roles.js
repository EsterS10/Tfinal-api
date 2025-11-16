// src/routes/roles.js
// Rutas REST para la gestión de roles dentro del sistema.
// Incluye CRUD y una ruta adicional para listar usuarios asociados a un rol.

import { Router } from 'express';
import { validationResult } from 'express-validator';

import { Rol } from '../models/rol.js';
import { Usuario } from '../models/usuario.js';

import {
  crearRolVal,
  idParamRolVal,
  actualizarRolVal
} from '../validators/roles.js';

const router = Router();

/**
 * GET /roles
 * Obtiene todos los roles registrados en el sistema.
 * Ordenados ascendentemente por ID.
 */
router.get('/', async (req, res, next) => {
  try {
    const roles = await Rol.findAll({ order: [['id', 'ASC']] });
    res.json(roles);
  } catch (e) {
    next(e);
  }
});

/**
 * GET /roles/:id
 * Obtiene un rol específico por ID.
 */
router.get('/:id', idParamRolVal, async (req, res, next) => {
  try {
    // Validación del parámetro :id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const rol = await Rol.findByPk(req.params.id);

    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    res.json(rol);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /roles
 * Crea un nuevo rol en el sistema.
 */
router.post('/', crearRolVal, async (req, res, next) => {
  try {
    // Validación del body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { nombre, descripcion } = req.body;

    // Crear rol
    const rol = await Rol.create({ nombre, descripcion });

    res.status(201).json(rol);
  } catch (e) {
    // Manejo de error por nombre de rol duplicado
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ mensaje: 'El nombre de rol ya existe' });
    }
    next(e);
  }
});

/**
 * PUT /roles/:id
 * Actualiza un rol existente.
 * Solo modifica los campos enviados en el body de la solicitud.
 */
router.put('/:id', actualizarRolVal, async (req, res, next) => {
  try {
    // Validación de :id y body opcional
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { id } = req.params;

    // Sequelize devuelve [numRegistrosAfectados]
    const [num] = await Rol.update(req.body, { where: { id } });

    if (!num) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    // Obtener rol actualizado
    const actualizado = await Rol.findByPk(id);

    res.json(actualizado);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ mensaje: 'El nombre de rol ya existe' });
    }
    next(e);
  }
});

/**
 * DELETE /roles/:id
 * Elimina un rol del sistema.
 */
router.delete('/:id', idParamRolVal, async (req, res, next) => {
  try {
    // Validación del parámetro :id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { id } = req.params;

    const num = await Rol.destroy({ where: { id } });

    if (!num) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    res.json({ mensaje: 'Rol eliminado' });
  } catch (e) {
    next(e);
  }
});

/**
 * GET /roles/:id/usuarios
 * Obtiene un rol junto con todos los usuarios asociados a ese rol.
 */
router.get('/:id/usuarios', async (req, res, next) => {
  try {
    const { id } = req.params;

    const rol = await Rol.findByPk(id, {
      attributes: ['id', 'nombre', 'descripcion'],
      include: [
        {
          model: Usuario,
          as: 'usuarios',
          attributes: [
            'id',
            'usuario',
            'nombre',
            'apellido',
            'correo',
            'estado',
            'creado_en',
            'actualizado_en'
          ],
          order: [['id', 'DESC']]
        }
      ]
    });

    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    res.json(rol);
  } catch (e) {
    next(e);
  }
});

export default router;
