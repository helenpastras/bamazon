use bamazon_db;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('iPhone 8 case', 'Electronics-Accesories', 15.99, 20), ('Apple Headphones', 'Electronics-Accesories', 19.99, 50), ('iPhone 8 Plus case', 'Electronics-Accesories', 25.99, 20), ('Bose Bluetooth Headphones', 'Electronics-Accesories', 149.99, 10),
('Tablet Stand Base ', 'Electronics-Accesories', 9.99, 5), ('Harry Potter Ravenclaw Chopstics', 'Novelty', 9.49, 10), ('Harry Potter Slytherin Chopstics', 'Novelty', 9.49, 10), ('Harry Potter Hufflepuff Chopstics', 'Novelty', 9.49, 10), ('Harry Potter Gryffindor Chopstics', 'Novelty', 9.49, 10),
('Harry Potter Ravenclaw Single Blanket', 'Housewares', 49.00, 10), ('Harry Potter Ravenclaw Double Blanket', 'Housewares', 59.00, 10) , ('Harry Potter Ravenclaw King Blanket', 'Housewares', 69.00, 10);
select * from products;

