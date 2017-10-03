CREATE DATABASE trade;

USE trade;

CREATE TABLE stocks (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  find INT NOT NULL,
  price FLOAT NOT NULL,
  PRIMARY KEY(id)
);

INSERT into stocks (name, find, price) VALUES ("Apple", 20, 2.74);
INSERT into stocks (name, find, price) VALUES ("Microsoft", 20, 3.74);
INSERT into stocks (name, find, price) VALUES ("Amazon", 20, 1.72);
INSERT into stocks (name, find, price) VALUES ("Google", 20, 5.74);
INSERT into stocks (name, find, price) VALUES ("Verizon", 20, 8.24);
INSERT into stocks (name, find, price) VALUES ("AT&T", 20, 2.44);
INSERT into stocks (name, find, price) VALUES ("Uber", 20, 1.74);
INSERT into stocks (name, find, price) VALUES ("Airbnb", 20, 1.54);
INSERT into stocks (name, find, price) VALUES ("Facebook", 20, 9.24);
INSERT into stocks (name, find, price) VALUES ("Snap", 20, 6.74);
INSERT into stocks (name, find, price) VALUES ("Walmart", 20, 7.74);