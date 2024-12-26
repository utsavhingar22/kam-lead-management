const express = require('express');
const { addLead, getLeads, getTodayCalls } = require('../controllers/leadController');
const pointOfContactController = require('../controllers/pointOfContactController');
const { addPOCForLead } = require('../controllers/pointOfContactController');
const callPlanController = require('../controllers/callPlanController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, addLead); // Add a new lead
router.get('/', authenticate, getLeads); // Retrieve all leads
router.get('/today-calls', authenticate, getTodayCalls); // Leads requiring calls today
router.post('/:leadId/pocs', authenticate, addPOCForLead); // Add a POC for a specific lead
router.get('/:leadId/pocs', authenticate, pointOfContactController.getPOCsForLead);
router.post('/call-plans', authenticate, callPlanController.addCallPlan);

module.exports = router;
