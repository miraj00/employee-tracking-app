DROP DATABASE IF EXISTS team;

CREATE DATABASE team;
USE team;


DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;



CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
  );

CREATE TABLE roles (
  roleid INTEGER AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(30) NOT NULL,
  salary DECIMAL(8,2) NOT NULL,
  department_id INTEGER
  );


CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager VARCHAR(30) NULL 
);

