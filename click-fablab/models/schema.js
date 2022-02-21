const Equipment = require("./equipment");
const Invoice = require("./invoice");
const Use = require("./use");
const User = require("./user");
const Role = require("./role");

Equipment.hasMany(Use);
Use.belongsTo(Equipment);

User.hasMany(Use);
Use.belongsTo(User);

Role.belongsToMany(User ,{ through: "user_roles"});
User.belongsToMany(Role,{ through: "user_roles"})

Invoice.hasMany(Use)
Use.belongsTo(Invoice)

User.hasMany(Invoice)
Invoice.belongsTo(User)


module.exports = {
  Equipment,
  Invoice,
  Use,
  User,
  Role,
};
