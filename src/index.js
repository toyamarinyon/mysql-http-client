import restify from 'restify'
import mysql   from 'mysql'
import dotenv  from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME
})
connection.connect()

const run_query = (sql) => {
  const execute_datetime = new Date()
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err)
      }
      const executed_datetime = new Date()
      const result = {
        execution_time_ms: executed_datetime - execute_datetime,
        num_rows: rows.length,
        rows: rows
      }

      resolve(result)
    })
  })
}

const server = restify.createServer({
  name: 'mysql-http-client',
  version: '0.0.1'
})
server
  .use(restify.acceptParser(server.acceptable))
  .use(restify.queryParser())
  .use(restify.bodyParser())

server
  .post('/query/', (req, res, next) => {
    run_query(req.params.sql)
        .then((result) => res.send(result))
        .catch((err) => res.send(err))
        .then(next())
  })

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
