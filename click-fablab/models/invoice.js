const debug = require("debug")("fablab:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining Invoice model...");

class Invoice extends Model {}

Invoice.init(
  {
    name : {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_begin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    date_end: {
      type: DataTypes.DATE,
      allowNull: false
  },
    total_amount:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
  },
  { sequelize: connection, modelName: "invoice" }
);

debug("Invoice model defined.");

module.exports = Invoice;
