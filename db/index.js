const mysql = require('mysql');


let connection = mysql.createConnection(JAWSDB_URL);

connection.connect();

let getPortfolio = () => {
  let queryString = `SELECT * FROM positions`;
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
  let eventQuery = `INSERT INTO events (trader, symbol, event_type, price, volume, date_time) VALUES ('Gordon', ${mysql.escape(stock.symbol)}, 'B', ${stock.close}, 1, ${mysql.escape(stock.refresh)});`;
  return new Promise((resolve, reject) => {
    connection.query(eventQuery, (err, res) => {
      if (!err) {
        let positionsQuery = `INSERT INTO positions (trader, symbol, number_of_shares, time_of_last_event, total_cost, net_gain) VALUES ('Gordon', ${mysql.escape(stock.symbol)}, 1, ${mysql.escape(stock.refresh)}, ${stock.close}, 0) ON DUPLICATE KEY UPDATE number_of_shares = 1, time_of_last_event = ${mysql.escape(stock.refresh)}, total_cost = ${stock.close}, net_gain = 0`;
        connection.query(positionsQuery, (err, res) => {
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
  });
};

// let sellStock = (stock) => {
// 	let eventQuery = `INSERT INTO events (trader, symbol, event_type, price, volume, date_time) VALUES ('Gordon', ${mysql.escape(stock.symbol)}, 'S', ${stock.close}, 1, ${mysql.escape(stock.refresh)});`;
// 	return new Promise((resolve, reject) => {
// 		connection.query(eventQuery, (err, res) => {
// 			if (!err) {
// 				let currentPositionValue = `SELECT total_cost FROM positions WHERE symbol = ${mysql.escape(stock.symbol)}`;
// 				connection.query(currentPositionValue, (err, res) => {
//           if (!err) {
//             console.log("Res:", res);
//           } else {
//             console.log(err);
//           }
//         });
//         let positionGain = currentPositionValue[0].total_cost - stock.close;
//         console.log("*** currentPositionValue[0].total_cost ***", currentPositionValue[0].total_cost);
//         console.log("*** stock.close ***", positionGain);
// 				let positionsQuery = `UPDATE positions SET number_of_shares=0, time_of_last_event=${mysql.escape(stock.refresh)}, total_cost=0, net_gain=${positionGain} WHERE symbol=${mysql.escape(stock.symbol)}`;
// 				connection.query(positionsQuery, (err, res) => {
//           if (!err) {
//             resolve(res);
//           } else {
//             console.log("Promise error in sell stock", err);
//             reject(err);
//           }
//         });
//       } else {
// 				reject(err);
// 			}
// 		});
// 	});
// };

let sellStock = (stock) => {
  let eventQuery = `INSERT INTO events (trader, symbol, event_type, price, volume, date_time) VALUES ('Gordon', ${mysql.escape(stock.symbol)}, 'S', ${stock.close}, 1, ${mysql.escape(stock.refresh)});`;
  return new Promise((resolve, reject) => {
    connection.query(eventQuery, (err, res) => {
      if (!err) {
        let currentPositionValue = `SELECT total_cost FROM positions WHERE symbol = ${mysql.escape(stock.symbol)}`;
        connection.query(currentPositionValue, (err, res) => {
          if (!err) {
            let positionGain = stock.close - res[0].total_cost;
            console.log('position gain', positionGain);
            let positionQuery = `UPDATE positions SET number_of_shares=0, time_of_last_event=${mysql.escape(stock.refresh)}, total_cost=0, net_gain=${positionGain} WHERE symbol=${mysql.escape(stock.symbol)}`;
            connection.query(positionQuery, (err, res) => {
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