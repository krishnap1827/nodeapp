const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const sequelize = require('./models/dbConfiguration');
const userRoute = require('./routes/user-router');
const app = express();
const cors = require('cors');

app.use(cors());


app.use(bodyParser.json());

async function checkDbConnection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter: true});
    console.log('Database connected via Sequelize');
  } catch (error) {
    await sequelize.close();
    console.error('Database connection failed:', error.message);
  }
}

checkDbConnection();

app.use("/api", userRoute);

app.get('/', (req, res) => {
  res.send('Express server running');
});

app.listen(config.port, function() {
    console.log("Server Started At: https://localhost:"+config.port)
});