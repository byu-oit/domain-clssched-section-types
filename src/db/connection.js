const { getParams } = require('../util/params')
const client = require('oracledb')
client.autoCommit = true
client.outFormat = client.OBJECT

let pool

exports.getPool = async function getPool () {
  if (pool) return pool
  const params = await getParams()
  pool = await client.createPool({
    user: params.db_username,
    password: params.db_password,
    connectionString: params.connection_string
  })
  return pool
}

process.on('SIGNIT', () => {
  if (pool) pool.close()
  process.kill(process.pid, 'SIGTERM')
})

async function getConnFromPool() {
  const pool = await exports.getPool()
  return pool.getConnection()
}

async function getSingleConn() {
  const params = await getParams()
  return client.getConnection({
    user: params.db_username,
    password: params.db_password,
    connectionString: params.connection_string
  })
}

async function getConn (usePool = true) {
  return (usePool) ? getConnFromPool() : getSingleConn()
}

exports.executeQuery = async function (sql, params, usePool) {
  const conn = await getConn(usePool)

}