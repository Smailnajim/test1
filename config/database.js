
const Sequelize = require("sequelize");

const sequelize = new Sequelize("clinic_flow", "postgres", "password", {
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;