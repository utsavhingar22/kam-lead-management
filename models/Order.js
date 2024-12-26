const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lead = require('./Lead');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  leadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Lead,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 }, // Ensure amount is non-negative
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Lead.hasMany(Order, { foreignKey: 'leadId' });
Order.belongsTo(Lead, { foreignKey: 'leadId' });

module.exports = Order;
