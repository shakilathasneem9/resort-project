const express = require("express");
const router = express.Router();
const db = require("../db"); // using the db.js connection

// 🟢 1. Get all room bookings with guest and room info
router.get("/rooms", (req, res) => {
  const sql = `
    SELECT rb.booking_id, g.name AS guest_name, r.room_number, r.room_type,
           rb.check_in_date, rb.check_out_date, rb.total_amount, rb.booking_status
    FROM RoomBookings rb
    JOIN Guests g ON rb.guest_id = g.guest_id
    JOIN Rooms r ON rb.room_id = r.room_id;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 🟢 2. Book a room
router.post("/rooms", (req, res) => {
  const { guest_id, room_id, check_in_date, check_out_date, total_amount } = req.body;

  const insertBooking = `
    INSERT INTO RoomBookings (guest_id, room_id, check_in_date, check_out_date, total_amount, booking_status)
    VALUES (?, ?, ?, ?, ?, 'Booked')
  `;

  db.query(insertBooking, [guest_id, room_id, check_in_date, check_out_date, total_amount], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // Update room status to "Booked"
    db.query("UPDATE Rooms SET status='Booked' WHERE room_id=?", [room_id], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ message: "Room booked successfully ✅", booking_id: result.insertId });
    });
  });
});

// 🟢 3. Checkout guest (free room)
router.put("/rooms/checkout/:id", (req, res) => {
  const bookingId = req.params.id;

  const getRoomId = "SELECT room_id FROM RoomBookings WHERE booking_id = ?";
  db.query(getRoomId, [bookingId], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: "Booking not found" });
    const roomId = result[0].room_id;

    // Mark booking as completed
    db.query("UPDATE RoomBookings SET booking_status='Completed' WHERE booking_id=?", [bookingId], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      // Free up the room
      db.query("UPDATE Rooms SET status='Available' WHERE room_id=?", [roomId], (err3) => {
        if (err3) return res.status(500).json({ error: err3.message });
        res.json({ message: "Guest checked out, room is now available ✅" });
      });
    });
  });
});

// 🟢 4. Get all activity bookings
router.get("/activities", (req, res) => {
  const sql = `
    SELECT ab.activity_booking_id, g.name AS guest_name, a.activity_name, i.name AS instructor_name,
           ab.booking_date, ab.participants, ab.total_cost
    FROM ActivityBookings ab
    JOIN Guests g ON ab.guest_id = g.guest_id
    JOIN Activities a ON ab.activity_id = a.activity_id
    JOIN Instructors i ON ab.instructor_id = i.instructor_id;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 🟢 5. Book an activity
router.post("/activities", (req, res) => {
  const { guest_id, activity_id, instructor_id, booking_date, participants, total_cost } = req.body;
  const sql = `
    INSERT INTO ActivityBookings (guest_id, activity_id, instructor_id, booking_date, participants, total_cost)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [guest_id, activity_id, instructor_id, booking_date, participants, total_cost], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Activity booked successfully ✅", booking_id: result.insertId });
  });
});

module.exports = router;
