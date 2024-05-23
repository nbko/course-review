# Course Review

Overview of my approach

1. website scraping
2. pdf to string conversion
3. data storage
4. text summarization
5. user interface -> displaying the summarized course review information on the
   screen where users can search for a professor or course

## Entity-Relationship Diagram

```
+----------------+         +-------------------+         +------------------+
|                |         |                   |         |                  |
|    Courses     |         |    CourseReview   |         |   Professors     |
|----------------|         |-------------------|         |----------------  |
| course_id (PK) |         | course_id (FK)    |         | professor_id (PK)|
| course_name    |---------| review_id (FK)    |---------| professor_name   |
| course_number  |         |                   |         |                  |
+----------------+         +-------------------+         +------------------+
                               |                               |
                               |                               |
                               |       +-------------------+   |
                               |       |                   |   |
                               |       | ProfessorReview   |   |
                               |       |-------------------|   |
                               |       | professor_id (FK) |   |
                               |       | review_id (FK)    |   |
                               |       +-------------------+   |
                               |                               |
                               |                               |
+----------------+             |             +-------------------+
|                |             |             |                   |
|    Quarters    |-------------*             |      Reviews      |
|----------------|                           |-------------------|
| quarter_id (PK)|                           | review_id (PK)    |
| quarter_name   |                           | quarter_id (FK)   |
+----------------+                           | review_text       |
                                             | question1_summary |
                                             | question2_summary |
                                             | question3_summary |
                                             | question4_summary |
                                             | question5_summary |
                                             | question6_summary |
                                             +-------------------+
```

## Relationships

- A Course can have multiple Reviews.
- A Professor can have multiple Reviews.
- A Review can be associated with multiple Courses and multiple Professors.
- Each Review is associated with one Quarter.
- CourseReview and ProfessorReview tables manage the many-to-many relationships
  between Courses, Professors, and Reviews.
