const mysql = require('mysql');

// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',  
//   password: '',   
//   database: 'vbfm2izfxg6l03xp'    
// });

let connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

let getPortfolio = (user) => {
  let queryString = `SELECT * FROM positions WHERE trader = user`;
  return new Promise((resolve, reject) => {
    connection.query(queryString, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

let saveStock = (stock) => {
  let eventQuery = `INSERT INTO events (trader, symbol, event_type, price, volume, date_time) VALUES (${stock.trader}, ${mysql.escape(stock.symbol)}, 'B', ${stock.close}, ${stock.volume}, ${mysql.escape(stock.refresh)});`;
  return new Promise((resolve, reject) => {
    connection.query(eventQuery, (err, res) => {
      if (!err) {
        connection.query(`SELECT * FROM positions WHERE trader = ${stock.trader} & symbol = ${mysql.escape(stock.symbol)}`, (err, res) => {
          if (!err) {
            // Update pre-existing position
            let currentShareNum = res[0].number_of_shares;
            let updatedShareNum = currentShareNum + stock.volume;
            let currentTotalCost = res[0].total_cost;
            let updatedTotalCost = currentTotalCost + (stock.volume * stock.close);
            let postionsUpdate = `UPDATE positions SET number_of_shares = ${updatedShareNum}, time_of_last_event = ${mysql.escape(stock.refresh)}, total_cost = ${updatedTotalCost} WHERE trader = ${stock.trader} & symbol = ${mysql.escape(stock.symbol)}`;
            connection.query(postionsUpdate, (err, res) => {
              if (!err) {
                resolve(res);
              } else {
                reject(err);
              }
            });
          } else {
            // Insert new position
            let totalCost = stock.volume * stock.close;
            let positionsInsert = `INSERT INTO positions (trader, symbol, number_of_shares, time_of_last_event, total_cost, net_gain) VALUES (${stock.trader}, ${mysql.escape(stock.symbol)}, ${stock.volume}, ${mysql.escape(stock.refresh)}, ${totalCost}, 0);`;
            connection.query(positionsInsert, (err, res) => {
              if (!err) {
                resolve(res);
              } else {
                reject(err);
              }
            });
          }
        });
      } else {
        reject(err);
      }  
    });
  });
};


let sellStock = (stock) => {
  let eventQuery = `INSERT INTO events (trader, symbol, event_type, price, volume, date_time) VALUES (${stock.trader}, ${mysql.escape(stock.symbol)}, 'S', ${stock.close}, ${stock.volume}, ${mysql.escape(stock.refresh)});`;
  return new Promise((resolve, reject) => {
    connection.query(eventQuery, (err, res) => {
      if (!err) {
        connection.query(`SELECT * FROM positions WHERE trader = ${stock.trader} & symbol = ${mysql.escape(stock.symbol)}`, (err, res) => {
          if (!err) {
            let avgShareCost = res[0].total_cost / res[0].number_of_shares;
            let costOfSale = avgShareCost * stock.volume;
            let incomeFromSale = stock.close * stock.volume;
            let saleNetGain = incomeFromSale - costOfSale;
            let updatedNetGain = res[0].net_gain + saleNetGain;
            let updatedTotalCost = res[0].total_cost - costOfSale;
            let updatedShareNum = res[0].number_of_shares - stock.volume;
            let positionsUpdate = `UPDATE positions SET number_of_shares = ${updatedShareNum}, time_of_last_event = ${mysql.escape(stock.refresh)}, total_cost = ${updatedTotalCost}, net_gain = ${updatedNetGain} WHERE trader = ${stock.trader} & symbol = ${stock.symbol}`;
            connection.query(positionsUpdate, (err, res) => {
              if (!err) {
                resolve(res);
              } else {
                reject(err);
              }
            });
          } else {
            reject(err);
          }
        });
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  getPortfolio,
  saveStock,
  sellStock
};