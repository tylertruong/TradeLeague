const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: '',   
  database: 'vbfm2izfxg6l03xp'    
});

//let connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

let getPortfolio = (user) => {
  let queryString = `SELECT * FROM positions WHERE trader = ${mysql.escape(user)}`;
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
  let eventQuery = `INSERT INTO events (trader, symbol, event_type, price, volume, date_time) VALUES (${mysql.escape(stock.trader)}, ${mysql.escape(stock.symbol)}, 'B', ${stock.close}, ${stock.volume}, ${mysql.escape(stock.refresh)});`;
  return new Promise((resolve, reject) => {
    connection.query(eventQuery, (err, res) => {
      if (!err) {
        connection.query(`SELECT * FROM positions WHERE trader = ${mysql.escape(stock.trader)} AND symbol = ${mysql.escape(stock.symbol)}`, (err, res) => {
          if (!err) {
            console.log('Inside update block. Res:', res);
            if (res.length !== 0) {
              // Update pre-existing position
              let currentShareNum = Number(res[0].number_of_shares);
              let updatedShareNum = currentShareNum + Number(stock.volume);
              let currentTotalCost = Number(res[0].total_cost);
              let updatedTotalCost = currentTotalCost + (Number(stock.volume) * Number(stock.close));
              let postionsUpdate = `UPDATE positions SET number_of_shares = ${updatedShareNum}, time_of_last_event = ${mysql.escape(stock.refresh)}, total_cost = ${updatedTotalCost} WHERE trader = ${mysql.escape(stock.trader)} AND symbol = ${mysql.escape(stock.symbol)}`;
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
              let positionsInsert = `INSERT INTO positions (trader, symbol, number_of_shares, time_of_last_event, total_cost, net_gain) VALUES (${mysql.escape(stock.trader)}, ${mysql.escape(stock.symbol)}, ${stock.volume}, ${mysql.escape(stock.refresh)}, ${totalCost}, 0);`;
              connection.query(positionsInsert, (err, res) => {
                if (!err) {
                  resolve(res);
                } else {
                  reject(err);
                }
              });
            }
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


let sellStock = (stock) => {
  let eventQuery = `INSERT INTO events (trader, symbol, event_type, price, volume, date_time) VALUES (${mysql.escape(stock.trader)}, ${mysql.escape(stock.symbol)}, 'S', ${stock.close}, ${stock.volume}, ${mysql.escape(stock.refresh)});`;
  return new Promise((resolve, reject) => {
    connection.query(eventQuery, (err, res) => {
      if (!err) {
        connection.query(`SELECT * FROM positions WHERE trader = ${mysql.escape(stock.trader)} AND symbol = ${mysql.escape(stock.symbol)}`, (err, res) => {
          if (!err) {
            let avgShareCost = Number(res[0].total_cost) / Number(res[0].number_of_shares);
            let costOfSale = avgShareCost * Number(stock.volume);
            let incomeFromSale = Number(stock.close) * Number(stock.volume);
            let saleNetGain = incomeFromSale - costOfSale;
            let updatedNetGain = Number(res[0].net_gain) + saleNetGain;
            let updatedTotalCost = Number(res[0].total_cost) - costOfSale;
            let updatedShareNum = Number(res[0].number_of_shares) - Number(stock.volume);
            let positionsUpdate = `UPDATE positions SET number_of_shares = ${updatedShareNum}, time_of_last_event = ${mysql.escape(stock.refresh)}, total_cost = ${updatedTotalCost}, net_gain = ${updatedNetGain} WHERE trader = ${mysql.escape(stock.trader)} AND symbol = ${mysql.escape(stock.symbol)}`;
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