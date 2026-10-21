const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

let pool = null;
if (isProduction || process.env.DATABASE_URL) {
  // Na nuvem (Render) a conexão vem da variável de ambiente DATABASE_URL
  pool = new Pool({
    connectionString: process.env.DATABASE_URL, ssl: {
      rejectUnauthorized: false,
    }
  })
} else {
  // Banco local para desenvolvimento
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'arenagames',
    password: 'postgres',
    port: 5432
  })
}

module.exports = { pool }
