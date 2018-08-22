-- Create new DB named bamazon_db
Create Database bamazon_db;
-- Tell MySQL this to use the newly created DB
use bamazon_db;

-- Add table named products with columns item_id, product_name,department_name,
-- price, stock_quantity, with the ID as primary key.
create table products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price decimal(10,2) NOT NULL,
stock_quantity  INTEGER,
PRIMARY KEY(item_id)
);
show TABLES;

