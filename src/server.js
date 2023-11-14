import mysql from 'mysql'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_mysql_crud',
})

conn.connect((err) => {
  if (err) throw err
  console.log('connected...')
})

// retrieve all the users
app.get('/api/users', (req, res) => {
  let sql = 'SELECT * FROM users'

  conn.query(sql, (err, results) => {
    if (err) throw err
    res.send(apiResponse(results))
  })
})

// create new user
app.post('/api/users', (req, res) => {
  const { name, age } = req.body
  const data = { name, age }
  /* const data = {name: req.body.name, age: req.body.age} */
  let sql = 'INSERT INTO users SET ?'

  conn.query(sql, data, (err, results) => {
    if (err) throw err
    res.send(apiResponse(results))
  })
})

// update user
app.put('/api/users/:id', (req, res) => {
  /*  
let asdf = "INSERT INTO users SET 
name='" + req.body.name + "', age='" + req.body.age + "' WHERE id=" + req.params.id */

  const { name, age } = req.body
  const userId = req.params.id

  const sql = 'UPDATE users SET name = ?, age = ? WHERE id = ?'
  const data = [name, age, userId]

  conn.query(sql, data, (err, results) => {
    if (err) throw err
    res.send(apiResponse(results))
  })
})

// Get single user
app.get('/api/users/:id', (req, res) => {
  const sql = 'SELECT * FROM users WHERE id=' + req.params.id

  conn.query(sql, (err, results) => {
    if (err) throw err
    res.send(apiResponse(results))
  })
})

app.delete('/api/users/:id', (req, res) => {
  const sql = 'DELETE FROM users WHERE id=' + req.params.id

  conn.query(sql, (err, results) => {
    if (err) throw err
    res.send(apiResponse(results))
  })
})

// api response
function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, data: results })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`served at http://localhost:${port}`))
