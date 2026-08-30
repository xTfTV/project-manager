-- Restore Script --

CREATE DATABASE IF NOT EXISTS Project_Manager_Test;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE Project_Manager_Test.user_role
LIKE Project_Manager.user_role;

CREATE TABLE Project_Manager_Test.user_info
LIKE Project_Manager.user_info;

CREATE TABLE Project_Manager_Test.Priority
LIKE Project_Manager.Priority;

CREATE TABLE Project_Manager_Test.Project_Status
LIKE Project_Manager.Project_Status;

CREATE TABLE Project_Manager_Test.Projects
LIKE Project_Manager.Projects;


INSERT INTO Project_Manager_Test.user_role
SELECT *
FROM Project_Manager.user_role;

INSERT INTO Project_Manager_Test.user_info
SELECT *
FROM Project_Manager.user_info;

INSERT INTO Project_Manager_Test.Priority
SELECT *
FROM Project_Manager.Priority;

INSERT INTO Project_Manager_Test.Project_Status
SELECT *
FROM Project_Manager.Project_Status;

INSERT INTO Project_Manager_Test.Projects
SELECT *
FROM Project_Manager.Projects;

SET FOREIGN_KEY_CHECKS = 1;