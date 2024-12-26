const PointOfContact = require('../models/PointOfContact');

exports.getPOCsForLead = async (req, res) => {
  try {
    const { leadId } = req.params;

    // Validate leadId is numeric
    if (isNaN(leadId)) {
      return res.status(400).json({ error: 'Invalid leadId provided' });
    }

    // Fetch POCs for the given lead ID
    const pocs = await PointOfContact.findAll({ where: { leadId } });

    if (!pocs.length) {
      return res.status(404).json({ message: 'No POCs found for this lead' });
    }

    res.status(200).json(pocs);
  } catch (err) {
    console.error('Error fetching POCs:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addPOCForLead = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { name, role, contactInfo } = req.body;

    // Validate leadId is numeric
    if (isNaN(leadId)) {
      return res.status(400).json({ error: 'Invalid leadId provided' });
    }

    // Validate request body
    if (!name || !role || !contactInfo) {
      return res.status(400).json({ error: 'Missing required fields (name, role, contactInfo)' });
    }

    // Create new Point of Contact
    const newPOC = await PointOfContact.create({ leadId, name, role, contactInfo });
    res.status(201).json(newPOC);
  } catch (err) {
    console.error('Error adding POC:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
