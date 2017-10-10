const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env

const config = {
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
}

module.exports = config