DROP DATABASE IF EXISTS trade;
CREATE DATABASE trade;
USE trade;

DROP TABLE IF EXISTS events;
CREATE TABLE events (
	ID INT AUTO_INCREMENT NOT NULL,
	trader VARCHAR(50) NOT NULL,	
  symbol VARCHAR(7) NOT NULL,
  event_type CHAR(1) NOT NULL,
  price DECIMAL(10,4) NOT NULL,
  volume INT NOT NULL,
  date_time TIMESTAMP NOT NULL,
  PRIMARY KEY(ID)
);

DROP TABLE IF EXISTS positions;
CREATE TABLE positions (
	trader VARCHAR(50) NOT NULL,	
  symbol VARCHAR(7) NOT NULL,
  number_of_shares INT NOT NULL,
  time_of_last_event TIMESTAMP NOT NULL,
  total_cost DECIMAL(10, 4) NOT NULL,
  net_gain DECIMAL(10, 4) NOT NULL,
  PRIMARY KEY(trader, symbol)
);