const mysql = require('mysql');

const connection = mysql.createConnection(process.env.JAWSDB_URL); 

connection.connect();

const getPortfolio = (user) => {
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

const saveStock = (stock) => {
  let eventQuery = `INSERT INTO events (trader, symbol, event_type, price, volume, date_time) VALUES (${mysql.escape(stock.trader)}, ${mysql.escape(stock.symbol)}, 'B', ${stock.close}, ${stock.volume}, ${mysql.escape(stock.refresh)});`;
  return new Promise((resolve, reject) => {
    connection.query(eventQuery, (err, res) => {
      if (!err) {
        connection.query(`SELECT * FROM positions WHERE trader = ${mysql.escape(stock.trader)} AND symbol = ${mysql.escape(stock.symbol)}`, (err, res) => {
          if (!err) {
            console.log('Inside update block. Res:', res);
            if (res.length !== 0) {
              // Update pre-existing position
              const currentShareNum = Number(res[0].number_of_shares);
              const updatedShareNum = currentShareNum + Number(stock.volume);
              const currentTotalCost = Number(res[0].total_cost);
              const updatedTotalCost = currentTotalCost + (Number(stock.volume) * Number(stock.close));
              const postionsUpdate = `UPDATE positions SET number_of_shares = ${updatedShareNum}, time_of_last_event = ${mysql.escape(stock.refresh)}, total_cost = ${updatedTotalCost} WHERE trader = ${mysql.escape(stock.trader)} AND symbol = ${mysql.escape(stock.symbol)}`;
              connection.query(postionsUpdate, (err, res) => {
                if (!err) {
                  resolve(res);
                } else {
                  reject(err);
                }
              });
            } else {
              // Insert new position
              const totalCost = stock.volume * stock.close;
              const positionsInsert = `INSERT INTO positions (trader, symbol, number_of_shares, time_of_last_event, total_cost, net_gain) VALUES (${mysql.escape(stock.trader)}, ${mysql.escape(stock.symbol)}, ${stock.volume}, ${mysql.escape(stock.refresh)}, ${totalCost}, 0);`;
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


const sellStock = (stock) => {
  const eventQuery = `INSERT INTO events (trader, symbol, event_type, price, volume, date_time) VALUES (${mysql.escape(stock.trader)}, ${mysql.escape(stock.symbol)}, 'S', ${stock.close}, ${stock.volume}, ${mysql.escape(stock.refresh)});`;
  return new Promise((resolve, reject) => {
    connection.query(eventQuery, (err, res) => {
      if (!err) {
        connection.query(`SELECT * FROM positions WHERE trader = ${mysql.escape(stock.trader)} AND symbol = ${mysql.escape(stock.symbol)}`, (err, res) => {
          if (!err) {
            const avgShareCost = Number(res[0].total_cost) / Number(res[0].number_of_shares);
            const costOfSale = avgShareCost * Number(stock.volume);
            const incomeFromSale = Number(stock.close) * Number(stock.volume);
            const saleNetGain = incomeFromSale - costOfSale;
            const updatedNetGain = Number(res[0].net_gain) + saleNetGain;
            const updatedTotalCost = Number(res[0].total_cost) - costOfSale;
            const updatedShareNum = Number(res[0].number_of_shares) - Number(stock.volume);
            const positionsUpdate = `UPDATE positions SET number_of_shares = ${updatedShareNum}, time_of_last_event = ${mysql.escape(stock.refresh)}, total_cost = ${updatedTotalCost}, net_gain = ${updatedNetGain} WHERE trader = ${mysql.escape(stock.trader)} AND symbol = ${mysql.escape(stock.symbol)}`;
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