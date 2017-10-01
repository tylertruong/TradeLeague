CREATE DATABASE trade;

USE trade;

CREATE TABLE stocks (
  id INT NOT NULL,
  name VARCHAR(20) NOT NULL,
  find INT NOT NULL,
  price FLOAT NOT NULL,
  PRIMARY KEY(id)
);

