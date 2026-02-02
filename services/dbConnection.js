// const { Pool } = require('pg');
const config = require('../config');

// const pool = new Pool({
//   connectionString: config.postgreSQLConnection
// });


// module.exports = pool;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.postgreSQLConnection, {
  dialect: 'postgres'
});

module.exports = sequelize;