
/* Ontop Script to create the priority values */

START TRANSACTION;

-- Insert the Values
INSERT INTO Priority (priority_name, LCV)
VALUES
	('Low', 0),
    ('Medium', 0),
    ('High', 0);

-- Check the rows inserted for verification
SELECT *
FROM Priority;

-- ROLLBACK;
-- COMMIT;

