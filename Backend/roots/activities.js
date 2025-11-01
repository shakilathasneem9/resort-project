// roots/activities.js

const express = require("express");
const router = express.Router();
const db = require("../db");

// 🎯 1. Get all available activities
router.get("/", (req, res) => {
  const q = "SELECT * FROM Activities;";
  db.query(q, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ➕ 2. Add a new activity
router.post("/", (req, res) => {
  const {
    activity_name,
    activity_type,
    description,
    duration_minutes,
    price_per_person,
    difficulty_level,
    max_participants,
  } = req.body;

  const q = `
    INSERT INTO Activities 
    (activity_name, activity_type, description, duration_minutes, price_per_person, difficulty_level, max_participants)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  db.query(
    q,
    [
      activity_name,
      activity_type,
      description,
      duration_minutes,
      price_per_person,
      difficulty_level,
      max_participants,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Activity added successfully!", activity_id: result.insertId });
    }
  );
});

// 🧍‍♂️ 3. Get all activity bookings with guest + instructor info
router.get("/bookings", (req, res) => {
  const q = `
    SELECT ab.*, g.name AS guest_name, a.activity_name, i.name AS instructor_name
    FROM ActivityBookings ab
    JOIN Guests g ON ab.guest_id = g.guest_id
    JOIN Activities a ON ab.activity_id = a.activity_id
    JOIN Instructors i ON ab.instructor_id = i.instructor_id;
  `;
  db.query(q, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 🪶 4. Book a new activity for a guest
router.post("/book", (req, res) => {
  const { guest_id, activity_id, instructor_id, booking_date, participants, total_cost } = req.body;

  const q = `
    INSERT INTO ActivityBookings 
    (guest_id, activity_id, instructor_id, booking_date, participants, total_cost)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  db.query(q, [guest_id, activity_id, instructor_id, booking_date, participants, total_cost], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "🏕️ Activity booked successfully!", booking_id: result.insertId });
  });
});

module.exports = router;
