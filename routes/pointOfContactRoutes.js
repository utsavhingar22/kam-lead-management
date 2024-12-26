const express = require('express');
const { getPOCsForLead } = require('../controllers/pointOfContactController');
const authenticate = require('../middlewares/authMiddleware'); // Optional middleware for authentication

const router = express.Router();

// Route to get POCs for a specific lead
router.get('/:leadId', authenticate, getPOCsForLead);

module.exports = router;
