const express = require('express');
const sequelize = require('./config/database');
const Lead = require('./models/Lead');
const PointOfContact = require('./models/PointOfContact');
const Interaction = require('./models/Interaction');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const orderRoutes = require('./routes/orderRoutes');
const callPlanRoutes = require('./routes/callPlanRoutes');

const authenticate = require('./middlewares/authMiddleware');

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', authenticate, leadRoutes);
app.use('/api/interactions', authenticate, interactionRoutes);
app.use('/api/orders', authenticate, orderRoutes);
app.use('/api/call-plans', authenticate, callPlanRoutes);

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database connected and synchronized');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Error syncing database:', err);
    process.exit(1); // Exit process if database sync fails
  });

// Health Check Route
app.get('/', (req, res) => res.send('KAM Lead Management API Running'));
