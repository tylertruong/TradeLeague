const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index');
const mysql = require('mysql');
const fetcher = require('../helper/apiFetcher.js');
const request = require('request');


let app = express();


const dummyStocks = [
  {name: 'Ford Motor', ticker: 'F'},
  {name: 'General Electric', ticker: 'GE'},
  // {name: 'Delta Air Lines', ticker: 'DAL'},
  // {name: 'Snap', ticker: 'SNAP'},
  // {name: 'Bank of America', ticker: 'BAC'},
  // {name: 'AT&T', ticker: 'T'},
  // {name: 'Twitter', ticker: 'TWTR'},
  // {name: 'Pfizer', ticker: 'PFE'},
  // {name: 'Coca-Cola', ticker: 'KO'},
  // {name: 'Nike', ticker: 'NKE'},
  // {name: 'Wal-Mart Stores', ticker: 'WMT'},
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

const cronJob = (stocks) => {

  let dStocks = stocks.map(stock => {
    return fetcher.fetchAll(stock.ticker).then(data => { 
      return {data: data.data, name: stock.name};
    });
  });

  Promise.all(dStocks)
    .then((data) => {
      let stocks = data.map(stock => {
        const {data, name} = stock;
        const metadata = data['Meta Data'];

        if (!metadata) {
          throw new Error;
        }

        const timeSeries = data['Time Series (1min)'];
        const symbol = metadata['2. Symbol'];
        const refresh = metadata['3. Last Refreshed'];

        return {symbol: symbol, series: timeSeries, name: name, refresh: refresh};
      }); 
      currentStocks = stocks;
    })
    .catch((err) => {
      console.log(err);
    });
};

setInterval(() => cronJob(dummyStocks), 500);

app.get('/stock/send-all', (req, res) => { //TODO put in res.end/redirect
  res.status(200).send(currentStocks);
});


app.get('/portfolio/send-all', (req, res) => {
  db.getPortfolio()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      throw new Error(res.json(e));
    });

});

app.post('/stock/buy', (req, res) => {
  console.log('buying!');
  const {stock} = req.body;

  let obj = {
    symbol: stock.symbol,
    close: stock.series[stock.refresh]['4. close'],
    refresh: stock.refresh,
  };

  db.saveStock(obj)
    .then((data) => {
      console.log('purchased!');
      res.send();
    })
    .catch((e) => {
      console.log(e);
    });
});


app.post('/stock/sell', (req, res) => {
  const {stock} = req.body;

  let obj = {
    symbol: stock.symbol,
    close: stock.close,
    refresh: stock.refresh,
  };
  
  console.log('obj', obj);
  db.sellStock(obj)
    .then((data) => {
      res.send();
    })
    .catch((e) => {
      throw new Error(res.json(e));
    });
});



const PORT = 3000;

app.listen(PORT, () => { console.log('Listening on port ' + PORT); } );
