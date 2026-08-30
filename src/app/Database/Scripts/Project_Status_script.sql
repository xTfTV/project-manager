
-- Script to insert the project status values

START TRANSACTION;

INSERT INTO Project_Status (project_status_name, LCV)
VALUES
('Submitted', 0),
('Progress', 0),
('Completed',0);

SELECT *
FROM Project_Status;

ROLLBACK;
-- COMMIT;
