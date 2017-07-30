-- Creating Database
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

--Creating Customer Table
USE bamazon_db;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2),
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
)