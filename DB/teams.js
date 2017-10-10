const { Client } = require('pg')
const config = require('./config') // todo : rewrite this with asyn/await https://blog.risingstack.com/mastering-async-await-in-nodejs/ https://node-postgres.com/

// CREATE TEAM 
const insertUser = (user) => {
  const client = new Client(config)
  client.connect()

  const query = `INSERT INTO USERS(NAME) VALUES($1) RETURNING *;`
  const values = [user]

  client.query(query, values, (err, res) => {
    if (err)
      console.log('err query is', err)
    else
      console.log('query successful, res is', res)
    client.end()
  })
}
module.exports.insertUser = insertUser


// GET TEAMS 
const getTeams = () => {
  const client = new Client(config)
  client.connect()

  const query = `SELECT * FROM TEAMS;`

  client.query(query)
    .then(res => console.log('queryInsert successful. res is', res.rows))
    .catch(err => console.log('err queryInsert is', err))
}
module.exports.getTeams = getTeams