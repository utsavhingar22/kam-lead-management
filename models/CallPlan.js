const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lead = require('./Lead');

const CallPlan = sequelize.define('CallPlan', {
  leadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Leads',  // Reference to Leads table
      key: 'id',       // The key in Leads table (assuming id is the primary key)
    },
  },
  frequency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 7, // Default call frequency in days
  },
  nextCallDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Lead.hasMany(CallPlan, { foreignKey: 'leadId' });
CallPlan.belongsTo(Lead, { foreignKey: 'leadId' });

module.exports = CallPlan;
