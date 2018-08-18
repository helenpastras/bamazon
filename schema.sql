Create Database bamazon_db;
use bamazon_db;

create table products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price decimal(10,2) NOT NULL,
stock_quantity  INTEGER,
PRIMARY KEY(item_id)
);
show TABLES;