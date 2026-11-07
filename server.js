const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD ?? 'root', // Change this to your MySQL password
  database: process.env.DB_NAME || 'course_studio'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    console.error('Check schema.sql and the database password in server.js.');
    process.exit(1);
  }
  console.log('Connected to MySQL database: course_studio');
});

const fields = ['course_id', 'course_code', 'course_name', 'credits', 'department', 'semester', 'course_fee'];
function validCourse(c) {
  return c && fields.every(k => c[k] !== undefined && c[k] !== '') &&
    Number.isInteger(Number(c.course_id)) && Number.isInteger(Number(c.credits)) &&
    Number.isInteger(Number(c.semester)) && Number(c.course_fee) >= 0;
}

app.get('/api/courses', (req, res) => {
  db.query('SELECT * FROM courses ORDER BY course_id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/courses/:id', (req, res) => {
  db.query('SELECT * FROM courses WHERE course_id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows.length) return res.status(404).json({ error: 'Course not found.' });
    res.json(rows[0]);
  });
});

app.post('/api/courses', (req, res) => {
  const c = req.body;
  if (!validCourse(c)) return res.status(400).json({ error: 'Please complete every field with valid values.' });
  const sql = 'INSERT INTO courses (course_id, course_code, course_name, credits, department, semester, course_fee) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [c.course_id, c.course_code.trim(), c.course_name.trim(), c.credits, c.department.trim(), c.semester, c.course_fee], err => {
    if (err) return res.status(400).json({ error: err.code === 'ER_DUP_ENTRY' ? 'Course ID or course code already exists.' : err.message });
    res.status(201).json({ message: 'Course added successfully.' });
  });
});

app.put('/api/courses/:id', (req, res) => {
  const c = req.body;
  if (!c || ['course_code','course_name','credits','department','semester','course_fee'].some(k => c[k] === undefined || c[k] === ''))
    return res.status(400).json({ error: 'Please complete every field.' });
  const sql = 'UPDATE courses SET course_code=?, course_name=?, credits=?, department=?, semester=?, course_fee=? WHERE course_id=?';
  db.query(sql, [c.course_code.trim(), c.course_name.trim(), c.credits, c.department.trim(), c.semester, c.course_fee, req.params.id], (err, result) => {
    if (err) return res.status(400).json({ error: err.code === 'ER_DUP_ENTRY' ? 'That course code is already in use.' : err.message });
    if (!result.affectedRows) return res.status(404).json({ error: 'Course not found.' });
    res.json({ message: 'Course updated successfully.' });
  });
});

app.delete('/api/courses/:id', (req, res) => {
  db.query('DELETE FROM courses WHERE course_id=?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result.affectedRows) return res.status(404).json({ error: 'Course not found.' });
    res.json({ message: 'Course deleted successfully.' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Course Studio is running at http://localhost:${PORT}`));
