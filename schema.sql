DROP DATABASE IF EXISTS bamazondb;
CREATE DATABASE bamazondb;

USE bamazondb;
CREATE TABLE products(
  item_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INT
)

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
  VALUES
    (1546, 'duct tape', 'home', 10.00, 54)
    (5679, 'plastic knives', 'home', 3.00, 16)
    (9876, 'bleach', 'cleaning supplies', 5.00, 20)
    (3232, 'paper hat', 'clothing', 8.00 55)
    (1121, 'motor oil', 'automotive', 30.00, 66)
    (9632, 'lamborghini', 'automotive', 1.00, 2)
    (4646, 'backpack', 'outdoors', 80.00, 25)
    (5873, 'watch', 'clothing', 60.00, 5)
    (2198, '4k TV', 'electronics', 150.00, 6)
    (7934, 'Nofriendo Switch', 'video games', 400.00, 1)