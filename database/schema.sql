CREATE DATABASE IF NOT EXISTS course_reviews;

USE course_reviews;


CREATE TABLE Courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    course_number VARCHAR(50)
);

CREATE TABLE Professors (
    professor_id INT AUTO_INCREMENT PRIMARY KEY,
    professor_name VARCHAR(255) NOT NULL
);

CREATE TABLE Quarters (
    quarter_id INT AUTO_INCREMENT PRIMARY KEY,
    quarter_name VARCHAR(50) NOT NULL
);

CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    quarter_id INT,
    review_text TEXT,
    question1_answer TEXT,
    question2_answer TEXT,
    question3_answer TEXT,
    question4_answer TEXT,
    question5_answer TEXT,
    question6_answer TEXT,
    summary TEXT,
    FOREIGN KEY (quarter_id) REFERENCES Quarters(quarter_id)
);

CREATE TABLE CourseReview (
    course_id INT,
    review_id INT,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    FOREIGN KEY (review_id) REFERENCES Reviews(review_id),
    PRIMARY KEY (course_id, review_id)
);

CREATE TABLE ProfessorReview (
    professor_id INT,
    review_id INT,
    FOREIGN KEY (professor_id) REFERENCES Professors(professor_id),
    FOREIGN KEY (review_id) REFERENCES Reviews(review_id),
    PRIMARY KEY (professor_id, review_id)
);
