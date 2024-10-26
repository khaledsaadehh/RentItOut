const mysql = require("mysql2");
require("dotenv").config();
const dbConfig = require('./db.config');


const con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB

});

con.connect( (err)=>{
    if(err) throw err;
    console.log(" Connected Successfully to DB ");
    con.query("CREATE DATABASE IF NOT EXISTS rentitout", function(err, results){
        if(err){
            throw err;
        } 
        console.log(`rentitout DB Created!!`);

         // Create 'users' table if not exists
  const createTableQuery = `
  CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(300) NOT NULL,
  email VARCHAR(300) NOT NULL UNIQUE,
  password VARCHAR(300) NOT NULL,
  phone_number VARCHAR(300) NOT NULL,
  address VARCHAR(300) NOT NULL,
  role ENUM('user', 'admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  CREATE TABLE items (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(300) NOT NULL,
  rental_price DECIMAL(10,0) NOT NULL,
  available_from DATE NOT NULL,
  available_until DATE NOT NULL,
  user_id INT(11) NOT NULL,
  status VARCHAR(300) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE rentals (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  item_id INT(11) NOT NULL,
  user_id INT(11) NOT NULL,
  rental_start_date DATE NOT NULL,
  rental_end_date DATE NOT NULL,
  total_price DECIMAL(10,0) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE logistics (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rental_id INT(11) NOT NULL,
  delivery_address VARCHAR(300) NOT NULL,
  pickup_date DATE NOT NULL,
  delivery_status VARCHAR(300) NOT NULL,
  FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE payments (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rental_id INT(11) NOT NULL,
  payment_date DATE NOT NULL,
  amount DECIMAL(10,0) NOT NULL,
  FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE reviews (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  item_id INT(11) NOT NULL,
  user_id INT(11) NOT NULL,
  rating INT(11) NOT NULL,
  comment TEXT NOT NULL,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Insert into users table
INSERT INTO users (name, email, password, phone_number, address, role) VALUES
('Alice Johnson', 'alice.johnson@example.com', 'hashed_password_1', '1234567890', '123 Main St', 'user'),
('Bob Smith', 'bob.smith@example.com', 'hashed_password_2', '2345678901', '456 Oak St', 'user'),
('Charlie Brown', 'charlie.brown@example.com', 'hashed_password_3', '3456789012', '789 Pine St', 'admin'),
('Diana Prince', 'diana.prince@example.com', 'hashed_password_4', '4567890123', '321 Elm St', 'user'),
('Edward Cullen', 'edward.cullen@example.com', 'hashed_password_5', '5678901234', '654 Maple St', 'user'),
('Fiona Gallagher', 'fiona.gallagher@example.com', 'hashed_password_6', '6789012345', '987 Cedar St', 'user'),
('George Harrison', 'george.harrison@example.com', 'hashed_password_7', '7890123456', '321 Oak St', 'user'),
('Harry Potter', 'harry.potter@example.com', 'hashed_password_8', '8901234567', '456 Elm St', 'user'),
('Ivy Green', 'ivy.green@example.com', 'hashed_password_9', '9012345678', '789 Maple St', 'admin'),
('Jack Black', 'jack.black@example.com', 'hashed_password_10', '1234567899', '123 Pine St', 'user'),
('Karen White', 'karen.white@example.com', 'hashed_password_11', '2345678902', '456 Cedar St', 'user'),
('Leo Blue', 'leo.blue@example.com', 'hashed_password_12', '3456789013', '789 Birch St', 'user'),
('Mona Lisa', 'mona.lisa@example.com', 'hashed_password_13', '4567890124', '321 Maple St', 'admin'),
('Nina Purple', 'nina.purple@example.com', 'hashed_password_14', '5678901235', '654 Oak St', 'user'),
('Oscar Green', 'oscar.green@example.com', 'hashed_password_15', '6789012346', '987 Elm St', 'user');

-- Insert into items table
INSERT INTO items (title, description, category, rental_price, available_from, available_until, user_id, status) VALUES
('Bicycle', 'Mountain bike in great condition.', 'Sports', 15, '2024-01-01', '2024-12-31', 1, 'available'),
('Camera', 'DSLR camera with lenses.', 'Electronics', 25, '2024-01-01', '2024-12-31', 2, 'available'),
('Tent', 'Camping tent for 4 people.', 'Outdoors', 10, '2024-01-01', '2024-12-31', 3, 'rented'),
('Laptop', '15-inch laptop, perfect for work.', 'Electronics', 30, '2024-01-01', '2024-12-31', 4, 'available'),
('Guitar', 'Acoustic guitar, ideal for beginners.', 'Music', 8, '2024-01-01', '2024-12-31', 5, 'available'),
('Projector', 'HD projector with HDMI support.', 'Electronics', 20, '2024-01-01', '2024-12-31', 6, 'rented'),
('Kayak', 'Single person kayak for lake use.', 'Sports', 18, '2024-01-01', '2024-12-31', 7, 'available'),
('Sewing Machine', 'Easy-to-use sewing machine.', 'Appliances', 12, '2024-01-01', '2024-12-31', 8, 'available'),
('Drill', 'Cordless drill with charger.', 'Tools', 7, '2024-01-01', '2024-12-31', 9, 'rented'),
('Keyboard', 'Mechanical keyboard for gaming.', 'Electronics', 10, '2024-01-01', '2024-12-31', 10, 'available'),
('Bike Helmet', 'Safety helmet for cycling.', 'Sports', 5, '2024-01-01', '2024-12-31', 11, 'available'),
('BBQ Grill', 'Portable BBQ grill.', 'Outdoors', 12, '2024-01-01', '2024-12-31', 12, 'available'),
('Tablet', '10-inch tablet with WiFi.', 'Electronics', 18, '2024-01-01', '2024-12-31', 13, 'rented'),
('Telescope', 'Compact telescope for stargazing.', 'Optics', 20, '2024-01-01', '2024-12-31', 14, 'available'),
('Sleeping Bag', 'Sleeping bag for cold weather.', 'Outdoors', 8, '2024-01-01', '2024-12-31', 15, 'available');

-- Insert into rentals table
INSERT INTO rentals (item_id, user_id, rental_start_date, rental_end_date, total_price) VALUES
(1, 2, '2024-06-01', '2024-06-10', 150),
(2, 3, '2024-05-05', '2024-05-12', 175),
(3, 4, '2024-04-15', '2024-04-20', 50),
(4, 5, '2024-07-01', '2024-07-07', 210),
(5, 6, '2024-03-20', '2024-03-27', 56),
(6, 7, '2024-08-08', '2024-08-12', 80),
(7, 8, '2024-09-01', '2024-09-10', 162),
(8, 9, '2024-02-11', '2024-02-18', 84),
(9, 10, '2024-10-01', '2024-10-05', 35),
(10, 11, '2024-06-15', '2024-06-22', 70),
(11, 12, '2024-07-20', '2024-07-27', 35),
(12, 13, '2024-08-05', '2024-08-10', 84),
(13, 14, '2024-09-11', '2024-09-18', 126),
(14, 15, '2024-05-06', '2024-05-13', 140),
(15, 1, '2024-10-15', '2024-10-22', 56);

-- Insert into logistics table
INSERT INTO logistics (rental_id, delivery_address, pickup_date, delivery_status) VALUES
(1, '123 Main St', '2024-06-11', 'Delivered'),
(2, '456 Oak St', '2024-05-13', 'In Transit'),
(3, '789 Pine St', '2024-04-21', 'Delivered'),
(4, '321 Elm St', '2024-07-08', 'Scheduled'),
(5, '654 Maple St', '2024-03-28', 'Delivered'),
(6, '987 Cedar St', '2024-08-13', 'In Transit'),
(7, '321 Oak St', '2024-09-11', 'Scheduled'),
(8, '456 Elm St', '2024-02-19', 'Delivered'),
(9, '789 Maple St', '2024-10-06', 'In Transit'),
(10, '123 Pine St', '2024-06-23', 'Delivered'),
(11, '456 Cedar St', '2024-07-28', 'Scheduled'),
(12, '789 Birch St', '2024-08-11', 'Delivered'),
(13, '321 Maple St', '2024-09-19', 'In Transit'),
(14, '654 Oak St', '2024-05-14', 'Delivered'),
(15, '987 Elm St', '2024-10-23', 'Scheduled');

-- Insert into payments table
INSERT INTO payments (rental_id, payment_date, amount) VALUES
(1, '2024-06-02', 150),
(2, '2024-05-06', 175),
(3, '2024-04-16', 50),
(4, '2024-07-02', 210),
(5, '2024-03-21', 56),
(6, '2024-08-09', 80),
(7, '2024-09-02', 162),
(8, '2024-02-12', 84),
(9, '2024-10-02', 35),
(10, '2024-06-16', 70),
(11, '2024-07-21', 35),
(12, '2024-08-06', 84),
(13, '2024-09-12', 126),
(14, '2024-05-07', 140),
(15, '2024-10-16', 56);

-- Insert into reviews table
INSERT INTO reviews (item_id, user_id, rating, comment) VALUES
(1, 2, 5, 'Great bicycle, very smooth ride!'),
(2, 3, 4, 'Camera worked well, good quality pictures.'),
(3, 4, 3, 'Tent was fine but a bit cramped for 4 people.'),
(4, 5, 5, 'Perfect laptop for work, very fast.'),
(5, 6, 4, 'Guitar sounds great, nice for practice.'),
(6, 7, 5, 'Projector was fantastic for movie night!'),
(7, 8, 4, 'Kayak was stable and easy to use.'),
(8, 9, 3, 'Sewing machine works well but a bit noisy.'),
(9, 10, 5, 'Drill is powerful, good for small projects.'),
(10, 11, 4, 'Keyboard is comfortable to type on.'),
(11, 12, 4, 'Helmet is solid and safe.'),
(12, 13, 5, 'BBQ grill made cooking easy.'),
(13, 14, 4, 'Tablet was good for browsing and streaming.'),
(14, 15, 5, 'Telescope was clear, nice for beginners.'),
(15, 1, 3, 'Sleeping bag was warm, but a bit narrow.');

  
    `;
  
    const createTableQueries = createTableQuery.split(';');
    createTableQueries.forEach((query) => {
      con.query(query, (error, results, fields) => {
        if (error) {
          // console.error('Error executing SQL query:', error);
          return;
        }
        console.log('SQL query executed successfully!');
      });
    });
  


    })
} )

module.exports = con;