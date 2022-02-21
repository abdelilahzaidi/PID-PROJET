const debug = require("debug")("fablab:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining Role model...");

class Role extends Model {}

Role.init(
  {
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
  },
  { sequelize: connection, modelName: "role" }
);

debug("Role model defined.");

module.exports = Role;
