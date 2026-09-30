require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('hello world');
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync();
    console.log('Database models synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();