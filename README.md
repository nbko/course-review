# Course Review Summarization with Generative AI

## Project Overview

This project aims to improve the usability of the existing university course
review system. It addresses current limitations (like inconvenient list-based
UI, PDF-based reviews, and lack of filtering options) by providing a
user-friendly interface.

## Wireframe

View the wireframe on Figma:
[Wireframe Link](https://www.figma.com/proto/kbdvYvQwfErjummTOZDuLb/Course-Review?t=kc0S8Fj5fcfNCR4z-1)

## Key Features

1. One-time web scraping and storage of next semester’s courses taught by
   computer science faculty.
2. Summarization of course reviews using GPT API.
3. Display of course list per professor (course name, code, number of reviews).
4. Semester-based review summaries for each course.

## Technology Stack

- **Frontend**: React, TypeScript, MUI (Material UI)
- **Backend**: Supabase
- **Database**: PostgreSQL
- **Web Scraping**: Python's **Selenium** and **Beautiful Soup** (used for
  one-time scraping)
- **Natural Language Processing**: GPT API

## How It Works

1. Web scraping is performed using Selenium and Beautiful Soup to extract data
   from the university course review website.
2. The scraped data is summarized using the GPT API and stored in the database.
3. A React-based user interface is created using TypeScript for dynamic
   rendering of course and professor data.
4. Users can view a list of courses per professor and access semester-based
   review summaries for each course.

## Database Structure

![Database Structure](https://github.com/user-attachments/assets/d5757a87-c108-48c9-9066-d3fe5e79e144)

### Key Tables:

- `courses`: Stores course information.
- `instructors`: Stores professor information.
- `raw_course_reviews`: Contains unprocessed course review data.
- `course_reviews`: Contains GPT-summarized course reviews.
- `instructor_reviews`: Maps professors to their respective reviews.

## Data Management

- Data is scraped and stored once.
- To update the data, manual re-execution of the scraping process is required.

## Refactoring Issues (Debugging In Progress)

- When the professor’s state changes in the Search Input Component, the page
  redirects to the professor's page. However, when clicking on a course to view
  reviews, the professor’s page reloads and the review page does not load
  properly.
- Despite no logging of the state-changing function, the state still appears to
  change.
- To view reviews, users need to refresh the page manually after navigating to
  the professor's page.

## Future Plans

- **Real-time Summarization Improvements**: Implement real-time display of
  summarized reviews from GPT API (currently, results only display after the
  summary is complete and the page is refreshed).
- **Loading State**: Add loading indicators when data or pages are being loaded.
- **User Experience (UX) Enhancements**: Under consideration for improving
  UI/UX.
- **Performance Optimization**: Improve data loading and rendering speed.
- **(Postponed) Login/Signup**: Currently low priority, but could be implemented
  in the future if needed.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:nbko/course-review.git
   cd course-review
   ```

2. Install dependencies:

   ```bash
   npm install
   npm install @supabase/supabase-js
   npm i jotai
   npm install @mui/material @emotion/react @emotion/styled
   ```

3. Run the development server:

   ```bash
   npm run dev

   ```

## Screenshots

### Home Screen

<img width="1106" alt="Screenshot 2024-08-10 at 5 43 27 PM" src="https://github.com/user-attachments/assets/74060a50-be9c-4140-bc3f-a454b52cc181">

### Course List

<img width="1131" alt="Screenshot 2024-08-10 at 5 35 08 PM" src="https://github.com/user-attachments/assets/0128f82c-c00c-4777-be91-00ec3f9aadd3">

### Course Review

<img width="1102" alt="Screenshot 2024-08-10 at 5 34 31 PM" src="https://github.com/user-attachments/assets/b981f8ef-826a-4371-a582-1bff87f86c5d">
