// src/routes/usuarios.js
// Rutas REST para la gestión de usuarios dentro de la API.

import { Router } from 'express';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { validationResult } from 'express-validator';

import { Usuario } from '../models/usuario.js';
import { Rol } from '../models/rol.js';
import { crearUsuarioVal, idParamVal, actualizarUsuarioVal } from '../validators/usuarios.js';

const router = Router();

/**
 * GET /usuarios
 * Lista de usuarios con paginación y filtros opcionales:
 * - page, limit -> paginación
 * - estado -> filtra por estado (Activo / Inactivo)
 * - rol_id -> filtra por rol
 * - q -> búsqueda de texto en usuario, nombre, apellido, correo
 */
router.get('/', async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      estado,
      rol_id,
      q // búsqueda por texto
    } = req.query;

    const where = {};

    // Filtro por estado si se envía
    if (estado) where.estado = estado;

    // Filtro por rol si se envía
    if (rol_id) where.rol_id = Number(rol_id);

    // Búsqueda por texto parcial en varios campos
    if (q) {
      where[Op.or] = [
        { usuario: { [Op.like]: `%${q}%` } },
        { nombre: { [Op.like]: `%${q}%` } },
        { apellido: { [Op.like]: `%${q}%` } },
        { correo: { [Op.like]: `%${q}%` } }
      ];
    }

    const offset = (Number(page) - 1) * Number(limit);

    // Consulta con paginación y total de registros
    const { rows, count } = await Usuario.findAndCountAll({
      where,
      include: [{ model: Rol, as: 'rol', attributes: ['id', 'nombre'] }],
      attributes: { exclude: ['contrasena'] }, // nunca devolvemos la contraseña
      limit: Number(limit),
      offset,
      order: [['id', 'DESC']]
    });

    res.json({
      page: Number(page),
      limit: Number(limit),
      total: count,
      data: rows
    });
  } catch (e) {
    next(e);
  }
});

/**
 * GET /usuarios/:id
 * Obtiene el detalle de un usuario por su ID.
 */
router.get('/:id', idParamVal, async (req, res, next) => {
  try {
    // Validar parámetro :id
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id, {
      include: [{ model: Rol, as: 'rol', attributes: ['id', 'nombre'] }],
      attributes: { exclude: ['contrasena'] }
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /usuarios
 * Crea un nuevo usuario en el sistema.
 */
router.post('/', crearUsuarioVal, async (req, res, next) => {
  try {
    // Validar body del request
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    const {
      usuario,
      nombre,
      apellido,
      contrasena,
      celular,
      rol_id,
      correo,
      estado = 'Activo'
    } = req.body;

    // Encriptar la contraseña antes de guardar
    const hash = await bcrypt.hash(contrasena, 12);

    const nuevo = await Usuario.create({
      usuario,
      nombre,
      apellido,
      contrasena: hash,
      celular,
      rol_id,
      correo,
      estado
    });

    // Volvemos a consultar el usuario creado para incluir el rol y excluir la contraseña
    const respuesta = await Usuario.findByPk(nuevo.id, {
      include: [{ model: Rol, as: 'rol', attributes: ['id', 'nombre'] }],
      attributes: { exclude: ['contrasena'] }
    });

    res.status(201).json(respuesta);
  } catch (e) {
    // Manejo de error por claves únicas (usuario / correo duplicados)
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ mensaje: 'Usuario o correo ya registrado' });
    }
    next(e);
  }
});

/**
 * PUT /usuarios/:id
 * Actualiza la información de un usuario existente.
 * Solo se modifican los campos enviados en el body.
 */
router.put('/:id', actualizarUsuarioVal, async (req, res, next) => {
  try {
    // Validar parámetros y body
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    const { id } = req.params;
    const datos = { ...req.body };

    // Si se envía una nueva contraseña, la encriptamos
    if (datos.contrasena) {
      datos.contrasena = await bcrypt.hash(datos.contrasena, 12);
    }

    // Sequelize devuelve un array [numFilasAfectadas]
    const [num] = await Usuario.update(datos, { where: { id } });

    if (!num) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Obtenemos de nuevo el registro actualizado para devolverlo completo
    const actualizado = await Usuario.findByPk(id, {
      include: [{ model: Rol, as: 'rol', attributes: ['id', 'nombre'] }],
      attributes: { exclude: ['contrasena'] }
    });

    res.json(actualizado);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ mensaje: 'Usuario o correo ya registrado' });
    }
    next(e);
  }
});

/**
 * DELETE /usuarios/:id
 * Elimina un usuario del sistema por su ID.
 */
router.delete('/:id', idParamVal, async (req, res, next) => {
  try {
    // Validar parámetro :id
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    const { id } = req.params;

    const num = await Usuario.destroy({ where: { id } });

    if (!num) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado' });
  } catch (e) {
    next(e);
  }
});

export default router;
