const { body, validationResult } = require('express-validator');

// ── Reglas de validación ──────────────────────────────────────────────────────
const leadRules = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 120 }).withMessage('El nombre debe tener entre 2 y 120 caracteres'),

  body('telefono')
    .trim()
    .notEmpty().withMessage('El teléfono es requerido')
    .matches(/^[+\d\s\-()]{7,20}$/).withMessage('Teléfono inválido'),

  body('servicio')
    .optional()
    .isIn(['saas', 'custom', 'data_vision', 'general', ''])
    .withMessage('Servicio no válido'),

  body('mensaje')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('El mensaje no puede superar los 1000 caracteres'),

  body('origen')
    .optional()
    .isIn(['formulario', 'whatsapp'])
    .withMessage('Origen no válido'),
];

// ── Middleware que verifica los resultados ────────────────────────────────────
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      ok: false,
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = { leadRules, validate };
