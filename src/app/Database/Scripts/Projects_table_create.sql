
-- Script for creating the project table

DROP TABLE IF EXISTS Projects;

CREATE TABLE Projects (
	project_id INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(255) NOT NULL,
    priority_id INT, FOREIGN KEY (priority_id) REFERENCES Priority(priority_id),
    project_status_id INT, FOREIGN KEY (project_status_id) REFERENCES Project_Status(project_status_id),
    project_created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    project_due_date DATETIME NULL,
    comments VARCHAR(500) NULL,
    created_by_user_id INT, FOREIGN KEY (created_by_user_id) REFERENCES user_info(user_id),
    logical_cancel_value INT NOT NULL,
    project_complete_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
