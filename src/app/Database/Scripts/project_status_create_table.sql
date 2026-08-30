
-- Creating the table for the project status

DROP TABLE IF EXISTS Project_Status;

CREATE TABLE Project_Status (
	project_status_id INT PRIMARY KEY AUTO_INCREMENT,
    project_status_name VARCHAR(255) NOT NULL,
    LCV INT NOT NULL,
    DB_TimeStamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);