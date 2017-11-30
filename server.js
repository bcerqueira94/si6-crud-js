const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

var db

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {quotes: result})
    
    })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('Saved to Database.')
      res.redirect('/')
    })
})
  
MongoClient.connect('mongodb://bcerqueira94:crkgpgvt25@ds121456.mlab.com:21456/si6-crud-js', (err, database) => {
    if (err) return console.log(err)
        db = database
    app.listen(3000, () => {
      console.log('Running on 3000')
    })
})

app.delete('/quotes', (req, res) => {
    db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({message: 'A Darth Vader quote deleted.'})
    })
  })

  app.put('/quotes', (req, res) => {
    db.collection('quotes')
    .findOneAndUpdate(
      {name: 'Yoda'}, 
        {$set: {
            name: req.body.name,
            quote: req.body.quote
        }
    }, { 
      sort: {_id: 1},
      upsert: false
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })