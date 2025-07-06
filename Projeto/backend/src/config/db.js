const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'repumanager_prod',
  password: process.env.DB_PASSWORD || 'senhaSuperForte123!@#',
  database: process.env.DB_NAME || 'repumanager',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};

//POSTGRES_DB=repumanager
//POSTGRES_USER=repumanager_prod
//POSTGRES_PASSWORD=senhaSuperForte123!@#


//DB_HOST=postgres
//DB_PORT=5432
//DB_NAME=${POSTGRES_DB}
//DB_USER=${POSTGRES_USER}
//DB_PASSWORD=${POSTGRES_PASSWORD}

