const express = require('express');
const { addOrder, getOrders, getLeadPerformance } = require('../controllers/orderController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, addOrder); // Add an order
router.get('/:leadId', authenticate, getOrders); // Get all orders for a lead
router.get('/performance', authenticate, getLeadPerformance); // Performance metrics

module.exports = router;
