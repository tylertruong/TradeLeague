const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index');
const mysql = require('mysql');
const fetcher = require('./apiFetcher.js');
var request = require('request');


let app = express();


const dummyStocks = [
  {name: 'Ford Motor', ticker: 'F'},
  {name: 'General Electric', ticker: 'GE'},
  {name: 'Delta Air Lines', ticker: 'DAL'},
  {name: 'Snap', ticker: 'SNAP'},
  {name: 'Bank of America', ticker: 'BAC'},
  {name: 'AT&T', ticker: 'T'},
  {name: 'Twitter', ticker: 'TWTR'},
  {name: 'Pfizer', ticker: 'PFE'},
  {name: 'Coca-cola', ticker: 'KO'},
  {name: 'Nike', ticker: 'NKE'},
  {name: 'Wal-Mart Stores', ticker: 'WMT'},
  // {name: 'Morgan Stanley', ticker: 'MS'},
  // {name: 'Exxon Mobil', ticker: 'XOM'},
  // {name: 'Apple', ticker: 'AAPL'},
  // {name: 'Alphabet', ticker: 'GOOG'},
  // {name: 'Microsoft', ticker: 'MSFT'},
  // {name: 'Amazon', ticker: 'AMZN'},
  // {name: 'Berkshire Hathaway', ticker: 'BRK-B'},
  // {name: 'Johnson & Johnson', ticker: 'JNJ'},
  // {name: 'FaceBook', ticker: 'FB'},
  // {name: 'Visa', ticker: 'V'},
  // {name: 'Walt Disney', ticker: 'DIS'},
  // {name: 'McDonalds', ticker: 'MCD'},
  // {name: '3M', ticker: 'MMM'},
  // {name: 'Comcast', ticker: 'CCV'}
];

let currentStocks = [];

app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/stocks', (req, res) => { //TODO put in res.end/redirect

  let dStocks = dummyStocks.map(stock => {
    return fetcher.fetchAll(stock.ticker).then(data => { 
      return {data: data.data, name: stock.name};
    });
  });

  Promise.all(dStocks)
    .then((data) => {
      let stocks = data.map(stock => {
        const {data, name} = stock;
        const metadata = data['Meta Data'];
        const timeSeries = data['Time Series (1min)'];
        const symbol = metadata['2. Symbol'];
        const refresh = metadata['3. Last Refreshed'];

        return {symbol: symbol, series: timeSeries, name: name, refresh: refresh};
      }); 
      currentStocks = stocks;
      res.status(200).send(currentStocks);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send(currentStocks);
    });


});

app.get('/temp', (req, res) => {
  console.log(req.query.term);
  if (req.query.term) {
    res.status(200).send(stocks);
  } else {
    let queryString = 'SELECT * from stocks';
    db.query(queryString, (err, results) => {
      res.status(200).send(results);
    });

  }


app.get('stock/send-all', (req, res) => {
  var data = JSON.stringify(arrayOfStocks);
  res.end(data);
});


app.post('/stocks', (req, res) => {
  console.log('req.body: ', req.body);
  const {stocks} = req.body;

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

app.get('portfolio/send-all', (req, res) => {
  db.getPortfolio()
  .then((data) => {
    res.end(data);
  })
  .catch(function(e) {
    throw new Error(res.json(e));

  });
});

app.post('stock/buy', (req, res) => {
  var stock = req.body;
  //this is assuming the query functions are in the db/index.js file
  db.saveStock(stock)
  .then((data) => {
    res.end(data);
  })
  .catch(function(e) {
    throw new Error(res.json(e));
  });
});


  Promise.all(pStocks)
    .then((data) => {
      console.log('they all posted');
      res.status(200).send(stocks);
    });


app.patch('stock/sell/:stock', (req, res) => {
  var stockName = req.params.stock;
  //this is assuming the client is sending an object with a key 'price' and value = price at the point of sale
  var stockSalePrice = req.body.price;
  //this is assuming the client is sending an object with a key 'time' and value = time at the point of sale
  var stockSaleTime = req.body.time;
  var obj = {
    name: stockName,
    salePrice: stockSalePrice,
    saleTime: stockSaleTime
  };
  
  db.sellStock(obj)
  .then((data) => {
    res.end();
  })
  .catch(function(e) {
    throw new Error(res.json(e));
  })
});




const PORT = 3000;

app.listen(PORT, () => { console.log('Listening on port ' + PORT); } );
