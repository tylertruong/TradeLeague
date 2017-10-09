const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index');
const mysql = require('mysql');
const fetcher = require('../helper/apiFetcher.js');
const request = require('request');
const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
 
passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://tradeleague.herokuapp.com/login/google/return',
  profileFields: ['id', 'displayName', 'email']
},
(accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

let app = express();

app.use(express.static(path.join(__dirname, '../client/dist/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(session({ secret: 'keyboard cat', cookie: { user: '' } }));

const dummyStocks = [
  {name: 'Ford Motor', ticker: 'F'},
  {name: 'General Electric', ticker: 'GE'},
  {name: 'Delta Air Lines', ticker: 'DAL'},
  {name: 'Snap', ticker: 'SNAP'},
  {name: 'Bank of America', ticker: 'BAC'},
  {name: 'AT&T', ticker: 'T'},
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
  // {name: 'Facebook', ticker: 'FB'},
  // {name: 'Visa', ticker: 'V'},
  // {name: 'Walt Disney', ticker: 'DIS'},
  // {name: 'McDonalds', ticker: 'MCD'},
  // {name: '3M', ticker: 'MMM'},
];

let firstHalf = [];
let secondHalf = [];
let count = 0;

const cronJob = (stocks) => {

  Promise.all(dStocks)
    .then((data) => {
      let stocks = data.map(stock => {
        const { data, name } = stock;
        const metadata = data['Meta Data'];

        if (!metadata) {
          throw new Error;
        }

        const timeSeries = data['Time Series (1min)'];
        const symbol = metadata['2. Symbol'];
        const refresh = metadata['3. Last Refreshed'];

        return {symbol: symbol, series: timeSeries, name: name, refresh: refresh};
      }); 
    })
    .catch((err) => {
      console.log(err);
    });

};

cronJob(dummyStocks);
setInterval(() => cronJob(dummyStocks), 15000);


app.get('/login/google',
  passport.authenticate('google', { scope: ['profile'] }));


app.get('/login/google/return', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log(req.user);
    req.session.user = req.user.displayName;
    res.redirect('/');
  }
);

app.get('/stock/send-all', (req, res) => {
  let currentStocks = firstHalf.concat(secondHalf);
  res.status(200).send(currentStocks);
});


app.get('/portfolio/send-all', 
  (req, res) => {
    if (!req.session.user) {
      res.send([]);
    } else {
      db.getPortfolio(req.session.user)
        .then((data) => {
          res.send(data);
        })
        .catch((e) => {
          throw new Error(res.json(e));
        });
    }
  });

app.post('/stock/buy', 
  (req, res) => {
    if (!req.session.user) {
      res.send([]);
    } else {
      const { stock } = req.body;
      const { symbol, series, refresh, quantity } = stock;

      const obj = {
        symbol: symbol,
        close: series[refresh]['4. close'],
        refresh: refresh,
        volume: quantity,
        trader: req.session.user
      };

      db.saveStock(obj)
        .then((data) => {
          res.send();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });


app.post('/stock/sell', 
  (req, res) => {
    if (!req.session.user) {
      res.send([]);
    } else {
      const { stock } = req.body;
      const { symbol, refresh, quantity, close } = stock;

      const obj = {
        symbol: symbol,
        close: close,
        refresh: refresh,
        volume: quantity,
        trader: req.session.user
      };
      
      db.sellStock(obj)
        .then((data) => {
          res.send();
        })
        .catch((e) => {
          throw new Error(res.json(e));
        });
    }
  });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log('Listening on port ' + PORT); } );
