
-- Script for adding the user role table
DROP TABLE IF EXISTS user_role;

CREATE TABLE user_role (
	user_role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(255),
    LCV INT,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
