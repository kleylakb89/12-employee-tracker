/* clears out database before creating it */
DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;
/* creates department table with attributes */
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

/* creates role table with attributes */
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

/* creates manager table with attributes */
CREATE TABLE manager (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    department_id INT,
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

/* creates employee table with attributes */
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE SET NULL
);
