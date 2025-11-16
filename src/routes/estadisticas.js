// src/routes/estadisticas.js
// Ruta para obtener indicadores y métricas generales del sistema.
// Se consultan conteos básicos de usuarios y roles.

import { Router } from 'express';
import { Usuario } from '../models/usuario.js';
import { Rol } from '../models/rol.js';

const router = Router();

/**
 * GET /estadisticas
 * Devuelve datos agregados del sistema, incluyendo:
 * - total de usuarios
 * - usuarios activos
 * - usuarios inactivos
 * - total de roles
 *
 * Esta información es útil para reportes, dashboards o paneles administrativos.
 */
router.get('/', async (req, res, next) => {
  try {
    // Conteos básicos de usuarios
    const totalUsuarios = await Usuario.count();
    const activos = await Usuario.count({ where: { estado: 'Activo' } });
    const inactivos = await Usuario.count({ where: { estado: 'Inactivo' } });

    // Conteo de roles registrados
    const totalRoles = await Rol.count();

    // Respuesta estructurada
    res.json({
      total_usuarios: totalUsuarios,
      activos,
      inactivos,
      total_roles: totalRoles
    });
  } catch (e) {
    next(e);
  }
});

export default router;
