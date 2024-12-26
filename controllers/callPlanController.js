const CallPlan = require('../models/CallPlan');
const Lead = require('../models/Lead');

// Add a new Call Plan
exports.addCallPlan = async (req, res) => {
  try {
    const { leadId, frequency, nextCallDate, time } = req.body;

    // Check if the lead exists
    const lead = await Lead.findByPk(leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Create a new call plan
    const callPlan = await CallPlan.create({ leadId, frequency, nextCallDate, time });
    res.status(201).json(callPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Call Plans for a Lead
exports.getCallPlansForLead = async (req, res) => {
  try {
    const { leadId } = req.params;

    // Fetch call plans for the given lead ID
    const callPlans = await CallPlan.findAll({ where: { leadId } });

    if (!callPlans.length) {
      return res.status(404).json({ message: 'No call plans found for this lead' });
    }

    res.status(200).json(callPlans);
  } catch (err) {
    console.error('Error fetching call plans:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a Call Plan
exports.updateCallPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { leadId, frequency, nextCallDate, time } = req.body;

    // Check if the call plan exists
    const callPlan = await CallPlan.findByPk(id);
    if (!callPlan) {
      return res.status(404).json({ error: 'Call plan not found' });
    }

    // Update the call plan
    callPlan.leadId = leadId || callPlan.leadId;
    callPlan.frequency = frequency || callPlan.frequency;
    callPlan.nextCallDate = nextCallDate || callPlan.nextCallDate;
    callPlan.time = time || callPlan.time;

    await callPlan.save();
    res.status(200).json(callPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a Call Plan
exports.deleteCallPlan = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the call plan
    const callPlan = await CallPlan.findByPk(id);
    if (!callPlan) {
      return res.status(404).json({ error: 'Call plan not found' });
    }

    // Delete the call plan
    await callPlan.destroy();
    res.status(204).json({ message: 'Call plan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
