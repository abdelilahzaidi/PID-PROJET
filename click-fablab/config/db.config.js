module.exports = {
    HOST: "localhost",
    USER: "hatim",
    PASSWORD: "654123as",
    DB: "my_db",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };