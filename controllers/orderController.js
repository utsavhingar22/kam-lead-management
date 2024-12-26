const sequelize = require('../config/database');
const Order = require('../models/Order');
const Lead = require('../models/Lead');

// Add an Order
exports.addOrder = async (req, res) => {
  try {
    const { leadId, date, amount } = req.body;

    if (!leadId || !date || !amount) {
      return res.status(400).json({ error: 'Lead ID, date, and amount are required' });
    }

    const lead = await Lead.findByPk(leadId);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    const order = await Order.create({ leadId, date, amount });
    res.status(201).json({ message: 'Order added successfully', order });
  } catch (err) {
    res.status(500).json({ error: `Failed to add order: ${err.message}` });
  }
};

// Get All Orders for a Lead
exports.getOrders = async (req, res) => {
  try {
    const { leadId } = req.params;

    if (!leadId) {
      return res.status(400).json({ error: 'Lead ID is required' });
    }

    const orders = await Order.findAll({ where: { leadId } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch orders: ${err.message}` });
  }
};

// Get Lead Performance
exports.getLeadPerformance = async (req, res) => {
  try {
    const performance = await Lead.findAll({
      include: {
        model: Order,
        attributes: [],
      },
      attributes: [
        'id',
        'name',
        [sequelize.fn('COUNT', sequelize.col('Orders.id')), 'total_orders'],
        [sequelize.fn('SUM', sequelize.col('Orders.amount')), 'total_revenue'],
      ],
      group: ['Lead.id'],
      order: [[sequelize.literal('total_revenue'), 'DESC']],
    });

    res.json(performance);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch performance metrics: ${err.message}` });
  }
};
