
-- Script for creating the user information table
DROP TABLE IF EXISTS user_info;

CREATE TABLE user_info (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email_address VARCHAR(255),
    password_hash VARCHAR(255),
    User_role_id INT, FOREIGN KEY (user_role_id) REFERENCES user_role (user_role_id),
    logical_cancel_value INT,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

