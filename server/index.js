const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index');
const mysql = require('mysql');

let app = express();
 
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/stocks', (req, res) => {
  console.log(req.query.term);
  if (req.query.term) {
    res.status(200).send(stocks);
  } else {
    let queryString = 'SELECT * from stocks';
    db.query(queryString, (err, results) => {
      res.status(200).send(results);
    });
  
  }

});

app.post('/stocks', (req, res) => {
  const {stocks} = req.body;
  console.log(stocks);

  let pStocks = stocks.map(stock => {

    return new Promise ((resolve, reject) => {
      let queryString = `INSERT INTO stocks (id, name, find, price) VALUES (${stock.id},${mysql.escape(stock.name)}, ${stock.find}, ${stock.price});`;
      console.log(queryString);
      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          reject (err);
        } else {
          resolve(results);
        }
      });
    });
  });

  Promise.all(pStocks)
    .then((data) => {
      console.log('they all posted');
      res.status(200).send(stocks);
    });
  
});

const PORT = 3000;

app.listen(PORT, () => { console.log('Listening on port ' + PORT); } );