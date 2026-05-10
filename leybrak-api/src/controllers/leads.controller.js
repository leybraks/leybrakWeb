const pool = require('../db/pool');

// ── POST /api/leads ───────────────────────────────────────────────────────────
const createLead = async (req, res) => {
  const { nombre, telefono, servicio = 'general', origen = 'formulario', mensaje = '' } = req.body;

  // IP del visitante (para detectar spam a futuro)
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  try {
    const result = await pool.query(
      `INSERT INTO leads (nombre, telefono, servicio, origen, mensaje, ip_origen)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nombre, telefono, servicio, origen, estado, created_at`,
      [nombre, telefono, servicio, origen, mensaje, ip]
    );

    const lead = result.rows[0];

    console.log(`📥 Nuevo lead: ${lead.nombre} | ${lead.telefono} | ${lead.servicio} | ${lead.origen}`);

    return res.status(201).json({
      ok: true,
      message: '¡Solicitud recibida! Te contactamos pronto.',
      data: {
        id:        lead.id,
        nombre:    lead.nombre,
        servicio:  lead.servicio,
        createdAt: lead.created_at,
      },
    });

  } catch (err) {
    console.error('❌ Error guardando lead:', err.message);
    return res.status(500).json({
      ok: false,
      message: 'Error interno. Intenta nuevamente o escríbenos por WhatsApp.',
    });
  }
};

// ── GET /api/leads ─────────────────────────────────────────────────────────────
// Solo para uso interno / admin — proteger con auth en el futuro
const getLeads = async (req, res) => {
  const { estado, servicio, limit = 50, offset = 0 } = req.query;

  try {
    let where  = 'WHERE 1=1';
    const vals = [];

    if (estado) {
      vals.push(estado);
      where += ` AND estado = $${vals.length}`;
    }
    if (servicio) {
      vals.push(servicio);
      where += ` AND servicio = $${vals.length}`;
    }

    vals.push(parseInt(limit));
    vals.push(parseInt(offset));

    const result = await pool.query(
      `SELECT id, nombre, telefono, servicio, origen, estado, mensaje, created_at
       FROM leads
       ${where}
       ORDER BY created_at DESC
       LIMIT $${vals.length - 1} OFFSET $${vals.length}`,
      vals
    );

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM leads ${where}`,
      vals.slice(0, -2)
    );

    return res.json({
      ok:    true,
      total: parseInt(countResult.rows[0].count),
      data:  result.rows,
    });

  } catch (err) {
    console.error('❌ Error obteniendo leads:', err.message);
    return res.status(500).json({ ok: false, message: 'Error interno.' });
  }
};

// ── PATCH /api/leads/:id/estado ───────────────────────────────────────────────
const updateEstado = async (req, res) => {
  const { id }     = req.params;
  const { estado } = req.body;

  const valid = ['nuevo', 'contactado', 'cerrado'];
  if (!valid.includes(estado)) {
    return res.status(422).json({ ok: false, message: 'Estado no válido.' });
  }

  try {
    const result = await pool.query(
      `UPDATE leads SET estado = $1 WHERE id = $2 RETURNING id, nombre, estado`,
      [estado, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ ok: false, message: 'Lead no encontrado.' });
    }

    return res.json({ ok: true, data: result.rows[0] });

  } catch (err) {
    console.error('❌ Error actualizando lead:', err.message);
    return res.status(500).json({ ok: false, message: 'Error interno.' });
  }
};

module.exports = { createLead, getLeads, updateEstado };
