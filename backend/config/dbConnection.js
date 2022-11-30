const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;
let dark = "#242B2E"
const dbConnection = () => {
  mongoose
    .connect(MONGODB_URL)
    .then((conn) => {
      console.log(`DB is connected to:${conn.connection.host}`);
    })
    .catch((error) => {
      console.log("Error::", error);
      process.exit(1);
    });
};

module.exports = dbConnection;
