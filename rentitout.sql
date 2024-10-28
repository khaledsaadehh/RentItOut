

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



COMMIT;
