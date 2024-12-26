const Lead = require('../models/Lead');
const sequelize = require('../config/database');

// Add a New Lead
exports.addLead = async (req, res) => {
  try {
    const { name, address, status, last_call_date, call_frequency } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Lead name is required' });
    }

    const lead = await Lead.create({ name, address, status, last_call_date, call_frequency });
    res.status(201).json({ message: 'Lead added successfully', lead });
  } catch (err) {
    res.status(500).json({ error: `Failed to add lead: ${err.message}` });
  }
};

// Get All Leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch leads: ${err.message}` });
  }
};

// Get Leads Requiring Calls Today
exports.getTodayCalls = async (req, res) => {
  try {
    const leads = await Lead.findAll({
      where: sequelize.where(
        sequelize.fn(
          'DATE_ADD',
          sequelize.col('last_call_date'),
          sequelize.literal('INTERVAL call_frequency DAY')
        ),
        '<=',
        sequelize.fn('CURRENT_DATE')
      ),
    });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch today's calls: ${err.message}` });
  }
};
