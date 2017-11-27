const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

var db

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
})

MongoClient.connect('mongodb://<dbuser>:<dbpassword>@ds121456.mlab.com:21456/si6-crud-js', (err, database) => {
    if (err) return console.log(err)
        db = database
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
})