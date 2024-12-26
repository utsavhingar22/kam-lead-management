const Lead = require('./Lead');
const PointOfContact = require('./PointOfContact');

// Initialize associations
Lead.hasMany(PointOfContact, { foreignKey: 'leadId' });
PointOfContact.belongsTo(Lead, { foreignKey: 'leadId' });

module.exports = { Lead, PointOfContact };
