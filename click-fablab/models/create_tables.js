// Load all defined models
require("./schema");

const sequelize = require("./connection");
const debug = require("debug")("fablab:schema");

(async () => {
  debug("Synchronizing database...");
  await sequelize.sync({ force: true });
  debug("Database synchronized.");

  await sequelize.close();
})();
