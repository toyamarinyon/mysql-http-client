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

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
})

server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.get('/echo/:name', (req, res, next) => {
  res.send(req.params);
  return next();
})

connection.connect()


// server.listen(8080, function () {
//     console.log('%s listening at %s', server.name, server.url);
// });

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) {
    console.log(err.message)
    return
  }
  console.log(rows)
  console.log(fields)
})

connection.end()
