const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lead = require('./Lead');

const Interaction = sequelize.define('Interaction', {
  type: {
    type: DataTypes.ENUM('Call', 'Note'),
    allowNull: false,
    validate: {
      isIn: [['Call', 'Note']], // Ensure type matches allowed values
    },
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional field
  },
});

// Relationships
Lead.hasMany(Interaction, { foreignKey: 'lead_id', onDelete: 'CASCADE' });
Interaction.belongsTo(Lead, { foreignKey: 'lead_id' });

module.exports = Interaction;
