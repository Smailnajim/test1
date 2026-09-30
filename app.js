const express = require("express");

const app = express();

const port = 3000;

const db = require("./config/database");

const initApp = async () => {
   console.log("Testing the database connection..");

   try {
      await db.authenticate();
      console.log("Connection has been established successfully.");

      app.listen(port, () => {
         console.log(`Server is running at: http://localhost:${port}`);
      });
   } catch (error) {
      console.error("Unable to connect to the database:", error.original);
   }
};

initApp();