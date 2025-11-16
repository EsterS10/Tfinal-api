// src/routes/logs.js
// Rutas para consultar la auditoría generada por los triggers en la base de datos.
// Esta API permite filtrar logs por tabla, operación y limitar la cantidad de resultados.

import { Router } from 'express';
import { LogAuditoria } from '../models/logAuditoria.js';

const router = Router();

/**
 * GET /auditoria
 * Permite consultar los registros de auditoría con filtros opcionales.
 * Parámetros de consulta (query params):
 *  - tabla: filtra por el nombre de la tabla afectada (usuarios, roles, etc.)
 *  - operacion: INSERT | UPDATE | DELETE
 *  - limit: número máximo de registros a devolver (default: 50)
 *
 * Ejemplo:
 *   /auditoria?tabla=usuarios&operacion=INSERT&limit=20
 */
router.get('/', async (req, res, next) => {
  try {
    const { tabla, operacion, limit = 50 } = req.query;

    const where = {};

    // Filtro por tabla si se envía (usuarios, roles…)
    if (tabla) where.tabla = tabla;

    // Filtro por tipo de operación (INSERT / UPDATE / DELETE)
    if (operacion) where.operacion = operacion;

    // Consulta ordenada por ID descendente (últimos primeros)
    const logs = await LogAuditoria.findAll({
      where,
      order: [['id', 'DESC']],
      limit: Number(limit)
    });

    res.json(logs);
  } catch (e) {
    next(e);
  }
});

export default router;
