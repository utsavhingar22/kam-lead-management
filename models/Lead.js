const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lead = sequelize.define('Lead', {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM('New', 'Contacted', 'Converted', 'Inactive'),
    defaultValue: 'New',
    allowNull: false,
  },
  last_call_date: { type: DataTypes.DATE, allowNull: true },
  call_frequency: {
    type: DataTypes.INTEGER,
    defaultValue: 7,
    allowNull: false,
    validate: { min: 1 }, // Ensure call frequency is positive
  },
}, { timestamps: true });

module.exports = Lead;
