const debug = require("debug")("fablab:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining Use model...");

class Use extends Model {}

Use.init(
  {
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
  },
  },
  { sequelize: connection, modelName: "use" }
);

debug("Use model defined.");

module.exports = Use;
