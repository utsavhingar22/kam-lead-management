const express = require('express');
const { addCallPlan, getCallPlansForLead, updateCallPlan, deleteCallPlan } = require('../controllers/callPlanController');
const router = express.Router();

router.post('/', addCallPlan);                 // Add a new call plan
router.get('/:leadId', getCallPlansForLead);   // Get all call plans for a lead
router.put('/:id', updateCallPlan);            // Update a specific call plan
router.delete('/:id', deleteCallPlan);         // Delete a call plan

module.exports = router;
