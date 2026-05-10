const { Router } = require('express');
const { createLead, getLeads, updateEstado } = require('../controllers/leads.controller');
const { leadRules, validate } = require('../middleware/validate');

const router = Router();

// Crear lead (formulario del sitio)
router.post('/',    leadRules, validate, createLead);

// Listar leads (interno — agregar auth después)
router.get('/',     getLeads);

// Actualizar estado de un lead
router.patch('/:id/estado', updateEstado);

module.exports = router;
