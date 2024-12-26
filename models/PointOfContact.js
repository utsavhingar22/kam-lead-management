const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lead = require('./Lead'); // Import Lead model to establish associations

const PointOfContact = sequelize.define('PointOfContact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactInfo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Leads', // Reference to the Leads table
      key: 'id',      // Foreign key pointing to the ID column
    },
  },
}, {
  timestamps: true,
});

// Define associations
Lead.hasMany(PointOfContact, { foreignKey: 'leadId' });
PointOfContact.belongsTo(Lead, { foreignKey: 'leadId' });

module.exports = PointOfContact;
