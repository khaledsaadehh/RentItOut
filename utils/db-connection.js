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
  

-- Table structure for table users
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(300) NOT NULL,
  email VARCHAR(300) NOT NULL UNIQUE,
  password VARCHAR(300) NOT NULL,
  phone_number VARCHAR(300) NOT NULL,
  address VARCHAR(300) NOT NULL,
  is_verified TINYINT(1) NOT NULL,
  role ENUM('user','admin') NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table items
CREATE TABLE items (
  id INT(11) NOT NULL AUTO_INCREMENT,
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(300) NOT NULL,
  rental_price DECIMAL(10,0) NOT NULL,
  available_from DATE NOT NULL,
  available_until DATE NOT NULL,
  user_id INT(11) NOT NULL,
  status VARCHAR(300) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table rentals
CREATE TABLE rentals (
  id INT(11) NOT NULL AUTO_INCREMENT,
  item_id INT(11) NOT NULL,
  user_id INT(11) NOT NULL,
  rental_start_date DATE NOT NULL,
  rental_end_date DATE NOT NULL,
  total_price DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table damage_deposits
CREATE TABLE damage_deposits (
  id INT(11) NOT NULL AUTO_INCREMENT,
  rental_id INT(11) NOT NULL,
  desposit_amount DECIMAL(10,0) NOT NULL,
  is_refund TINYINT(4) NOT NULL,
  refund_date DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table insurance_plans
CREATE TABLE insurance_plans (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(300) NOT NULL,
  coverage_details TEXT NOT NULL,
  premium DECIMAL(10,0) NOT NULL,
  duration_days INT(11) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table structure for table logistics
CREATE TABLE logistics (
  id INT(11) NOT NULL AUTO_INCREMENT,
  rental_id INT(11) NOT NULL,
  delivery_address VARCHAR(300) NOT NULL,
  pickup_date DATE NOT NULL,
  delivery_status VARCHAR(300) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table payments
CREATE TABLE payments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  rental_id INT(11) NOT NULL,
  payment_date DATE NOT NULL,
  amount DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table ratings
CREATE TABLE ratings (
  id INT(11) NOT NULL AUTO_INCREMENT,
  item_id INT(11) NOT NULL,
  reviewed_user_id INT(11) NOT NULL,
  reviewing_user_id INT(11) NOT NULL,
  rating INT(11) NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (reviewed_user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (reviewing_user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table recent_views
CREATE TABLE recent_views (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  item_id INT(11) NOT NULL,
  viewed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table recommendations
CREATE TABLE recommendations (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  item_id INT(11) NOT NULL,
  recommendation_reason VARCHAR(300) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table structure for table rental_insurance
CREATE TABLE rental_insurance (
  id INT(11) NOT NULL AUTO_INCREMENT,
  rental_id INT(11) NOT NULL,
  insurance_id INT(11) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(300) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (insurance_id) REFERENCES insurance_plans(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table reviews
CREATE TABLE reviews (
  id INT(11) NOT NULL AUTO_INCREMENT,
  item_id INT(11) NOT NULL,
  user_id INT(11) NOT NULL,
  rating INT(11) NOT NULL,
  comment TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table transaction_fees
CREATE TABLE transaction_fees (
  id INT(11) NOT NULL AUTO_INCREMENT,
  rental_id INT(11) NOT NULL,
  commission DECIMAL(11,0) NOT NULL,
  service_fee DECIMAL(11,0) NOT NULL,
  total_fee DECIMAL(11,0) NOT NULL,
  date DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserting mock data into the users table
INSERT INTO users (name, email, password, phone_number, address, is_verified, role) VALUES
('John Doe', 'john.doe@example.com', 'password123', '1234567890', '123 Elm St, Springfield', 1, 'user'),
('Jane Smith', 'jane.smith@example.com', 'password456', '0987654321', '456 Oak St, Springfield', 1, 'user'),
('Alice Johnson', 'alice.johnson@example.com', 'password789', '5551234567', '789 Pine St, Springfield', 1, 'admin'),
('Bob Brown', 'bob.brown@example.com', 'password012', '5557654321', '321 Maple St, Springfield', 1, 'user');

-- Inserting mock data into the items table
INSERT INTO items (title, description, category, rental_price, available_from, available_until, user_id, status) VALUES
('Lawn Mower', 'High power lawn mower', 'Gardening Equipment', 50, '2024-01-01', '2024-06-01', 1, 'available'),
('Power Drill', 'Cordless power drill', 'Tools', 30, '2024-02-01', '2024-05-01', 2, 'available'),
('Tent', '4-person camping tent', 'Camping Gear', 20, '2024-03-01', '2024-09-01', 1, 'available'),
('Bicycle', 'Mountain bike for rent', 'Sports Equipment', 15, '2024-01-15', '2024-08-15', 3, 'available');

-- Inserting mock data into the rentals table
INSERT INTO rentals (item_id, user_id, rental_start_date, rental_end_date, total_price) VALUES
(1, 1, '2024-03-01', '2024-03-10', 500),
(2, 2, '2024-02-05', '2024-02-12', 210),
(3, 1, '2024-04-01', '2024-04-05', 100),
(4, 3, '2024-07-01', '2024-07-15', 225);

-- Inserting mock data into the damage_deposits table
INSERT INTO damage_deposits (rental_id, desposit_amount, is_refund, refund_date) VALUES
(1, 100, 0, '2024-03-11'),
(2, 50, 1, '2024-02-15'),
(3, 75, 1, '2024-04-06'),
(4, 120, 0, '2024-07-16');

-- Inserting mock data into the insurance_plans table
INSERT INTO insurance_plans (name, coverage_details, premium, duration_days) VALUES
('Basic Coverage', 'Covers basic damages', 20, 30),
('Extended Coverage', 'Covers full damages', 50, 60),
('Theft Protection', 'Covers theft', 30, 30);

-- Inserting mock data into the logistics table
INSERT INTO logistics (rental_id, delivery_address, pickup_date, delivery_status) VALUES
(1, '123 Elm St, Springfield', '2024-03-01', 'delivered'),
(2, '456 Oak St, Springfield', '2024-02-05', 'pending'),
(3, '789 Pine St, Springfield', '2024-04-01', 'delivered'),
(4, '321 Maple St, Springfield', '2024-07-01', 'in transit');

-- Inserting mock data into the payments table
INSERT INTO payments (rental_id, payment_date, amount) VALUES
(1, '2024-03-01', 500),
(2, '2024-02-05', 210),
(3, '2024-04-01', 100),
(4, '2024-07-01', 225);

-- Inserting mock data into the ratings table
INSERT INTO ratings (item_id, reviewed_user_id, reviewing_user_id, rating, comment) VALUES
(1, 1, 2, 5, 'Great quality!'),
(2, 2, 1, 4, 'Good product but expensive.'),
(3, 1, 3, 5, 'Loved it! Very spacious.'),
(4, 3, 1, 3, 'Not bad but could be better.');

-- Inserting mock data into the recent_views table
INSERT INTO recent_views (user_id, item_id, viewed_at) VALUES
(1, 1, NOW()),
(2, 2, NOW()),
(1, 3, NOW()),
(3, 4, NOW());

-- Inserting mock data into the recommendations table
INSERT INTO recommendations (user_id, item_id, recommendation_reason, created_at) VALUES
(1, 2, 'Affordable and reliable.', NOW()),
(2, 1, 'Highly rated by users.', NOW()),
(3, 3, 'Perfect for camping.', NOW()),
(1, 4, 'Good for outdoor activities.', NOW());

-- Inserting mock data into the rental_insurance table
INSERT INTO rental_insurance (rental_id, insurance_id, start_date, end_date, status) VALUES
(1, 1, '2024-03-01', '2024-03-10', 'active'),
(2, 2, '2024-02-05', '2024-02-12', 'inactive'),
(3, 3, '2024-04-01', '2024-04-05', 'active'),
(4, 1, '2024-07-01', '2024-07-15', 'active');

-- Inserting mock data into the reviews table
INSERT INTO reviews (item_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Excellent experience!'),
(2, 2, 4, 'Satisfactory.'),
(3, 3, 5, 'Loved it! Perfect for my needs.'),
(4, 1, 3, 'Okay, but had some issues.');

-- Inserting mock data into the transaction_fees table
INSERT INTO transaction_fees (rental_id, commission, service_fee, total_fee, date) VALUES
(1, 50, 5, 55, '2024-03-01'),
(2, 20, 2, 22, '2024-02-05'),
(3, 10, 1, 11, '2024-04-01'),
(4, 30, 3, 33, '2024-07-01');



  
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