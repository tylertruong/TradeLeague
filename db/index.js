const mysql = require('mysql');

let connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'trade'
});

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

let sellStock = (stock) => {
	let eventQuery = `INSERT INTO events (trader, symbol, event_type, price, volume, date_time) VALUES ('Gordon', ${mysql.escape(stock.symbol)}, 'S', ${stock.close}, 1, ${mysql.escape(stock.refresh)});`;
	return new Promise((resolve, reject) => {
		connection.query(eventQuery, (err, res) => {
			if (!err) {
				let currentPositionValue = `SELECT price FROM positions WHERE symbol = ${stock.symbol}`;
				let positionGain = currentPositionValue[0].price - stock.close;
				let positionsQuery = `INSERT INTO positions (trader, symbol, number_of_shares, time_of_last_event, total_cost, net_gain) VALUES ('Gordon', ${mysql.escape(stock.symbol)}, 0, ${mysql.escape(stock.refresh)}, ${stock.close}, 0) ON DUPLICATE KEY UPDATE number_of_shares = 0, time_of_last_event = ${mysql.escape(stock.refresh)}, total_cost = 0, net_gain = ${positionGain}`;
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


module.exports = {
  getPortfolio,
  saveStock,
  sellStock
};