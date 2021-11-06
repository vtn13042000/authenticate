require("dotenv").config();

export default {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USERNAME || "logbook",
  PASSWORD: process.env.DB_PASSWORD || "logbook",
  DB: process.env.DB_NAME || "logbook",
  dialect: process.env.DB_DIALECT || "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
