const Interaction = require('../models/Interaction');
const Lead = require('../models/Lead');

// Add an Interaction
exports.addInteraction = async (req, res) => {
  try {
    const { lead_id, type, details } = req.body;

    // Validate input
    if (!lead_id || !type) {
      return res.status(400).json({ error: 'Lead ID and interaction type are required' });
    }

    // Check if the lead exists
    const lead = await Lead.findByPk(lead_id);
    if (!lead) {
      return res.status(404).json({ error: `Lead with ID ${lead_id} not found` });
    }

    const interaction = await Interaction.create({ lead_id, type, details });
    res.status(201).json({ message: 'Interaction added successfully', interaction });
  } catch (err) {
    res.status(500).json({ error: `Failed to add interaction: ${err.message}` });
  }
};

// Get All Interactions for a Lead
exports.getInteractions = async (req, res) => {
  try {
    const { leadId } = req.params;

    if (!leadId) {
      return res.status(400).json({ error: 'Lead ID is required' });
    }

    const interactions = await Interaction.findAll({ where: { lead_id: leadId } });
    res.json(interactions);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch interactions: ${err.message}` });
  }
};
