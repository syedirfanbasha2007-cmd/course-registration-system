# Course Studio — Course Registration System

A redesigned course CRUD website based on the user's supplied student-management example. Built with Node.js, Express, MySQL, HTML, CSS and vanilla JavaScript.

## Features
- Insert a course
- List/search all courses
- Find one course by Course ID
- Update an existing course
- Delete a course after confirmation
- Responsive dashboard interface with campus/library imagery

## Requirements
- Node.js with npm
- MySQL Server and MySQL Workbench

## Setup
1. Extract the ZIP and open this folder in VS Code.
2. In MySQL Workbench, open `schema.sql` and execute it. It creates `course_studio`, the `courses` table and four sample records.
3. Open `server.js` and set `password` to your MySQL root password. Alternatively, set the `DB_PASSWORD` environment variable.
4. In the VS Code terminal, run:
   ```bash
   npm install
   npm start
   ```
5. Open http://localhost:3000.

## Database configuration
The default configuration is `localhost`, user `root`, password `root`, database `course_studio`. Change the password in `server.js` to match your local MySQL setup.

## Project structure
- `server.js` — Express server and MySQL CRUD API
- `schema.sql` — database and table creation plus sample records
- `public/index.html` — overview dashboard
- `public/list.html` — list and search all courses
- `public/listOne.html` — retrieve one course
- `public/insert.html` — add course
- `public/update.html` — edit course
- `public/delete.html` — remove course
- `public/style.css` — interface styles
- `public/app.js` — frontend API requests and UI logic

Images and Google Fonts load from online services, so those decorative assets need an internet connection. CRUD operations require MySQL Server to be running.
