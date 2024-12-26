const express = require('express');
const { addInteraction, getInteractions } = require('../controllers/interactionController');
const router = express.Router();

router.post('/', addInteraction);         // Add an interaction
router.get('/:leadId', getInteractions); // Get all interactions for a specific lead

module.exports = router;
