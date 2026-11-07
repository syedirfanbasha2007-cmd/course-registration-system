CREATE DATABASE IF NOT EXISTS course_studio;
USE course_studio;

CREATE TABLE IF NOT EXISTS courses (
  course_id INT PRIMARY KEY,
  course_code VARCHAR(20) NOT NULL UNIQUE,
  course_name VARCHAR(120) NOT NULL,
  credits INT NOT NULL,
  department VARCHAR(80) NOT NULL,
  semester INT NOT NULL,
  course_fee DECIMAL(10,2) NOT NULL
);

INSERT IGNORE INTO courses
(course_id, course_code, course_name, credits, department, semester, course_fee)
VALUES
(201, 'CSE210', 'Algorithms & Problem Solving', 4, 'Computer Science', 3, 4200.00),
(202, 'CSE225', 'Database Systems', 3, 'Computer Science', 4, 3800.00),
(203, 'AIM310', 'Applied Artificial Intelligence', 4, 'Artificial Intelligence', 5, 5600.00),
(204, 'ECE202', 'Digital Electronics', 3, 'Electronics', 3, 3500.00);
