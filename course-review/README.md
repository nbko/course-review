# Course Review

Overview of my approach

1. website scraping
2. pdf to string conversion
3. data storage
4. text summarization
5. user interface -> displaying the summarized course review information on the
   screen where users can search for a professor or course

## Entity-Relationship Diagram

## Relationships

- A Course can have multiple Reviews.
- A Professor can have multiple Reviews.
- A Review can be associated with multiple Courses and multiple Professors.
- Each Review is associated with one Quarter.
- CourseReview and ProfessorReview tables manage the many-to-many relationships
  between Courses, Professors, and Reviews.
