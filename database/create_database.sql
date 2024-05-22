CREATE DATABASE course_reviews;

USE course_reviews;

CREATE TABLE IF NOT EXISTS Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    professor_name VARCHAR(255) NOT NULL,
    quarter VARCHAR(50) NOT NULL
);