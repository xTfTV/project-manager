-- Inserting the initial role information

START TRANSACTION;

-- Role Info

INSERT INTO user_role (
	role_name,
    LCV,
    created_date
)
VALUES (
	'Site Admin',
    0,
    NOW()
),
(
	'Admin',
    0,
    NOW()
),
(
	'User',
    0,
    NOW()
);

-- Viewing everything we just added
SELECT *
FROM user_role

-- ROLLBACK;
-- COMMIT;
