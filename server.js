const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

var db


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {quotes: result})
    })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
})
  
MongoClient.connect('mongodb://bcerqueira94:crkgpgvt25@ds121456.mlab.com:21456/si6-crud-js', (err, database) => {
    if (err) return console.log(err)
        db = database
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
})