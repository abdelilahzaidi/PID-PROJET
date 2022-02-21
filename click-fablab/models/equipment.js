const debug = require("debug")("fablab:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining Equipment model...");

class Equipment extends Model {}

Equipment.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
  },
  price: {
      type: DataTypes.FLOAT,
      allowNull: false
  },


  },
  { sequelize: connection, modelName: "equipment" }
);

debug("Equipment model defined.");

module.exports = Equipment;

