const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all payments with related guest + room info
router.get("/", (req, res) => {
  const q = `
    SELECT 
      p.payment_id,
      p.payment_date,
      p.payment_method AS payment_type,
      p.payment_status,
      p.amount,
      g.name AS guest_name,
      r.room_number
    FROM Payments p
    JOIN RoomBookings rb ON p.booking_id = rb.booking_id
    JOIN Guests g ON rb.guest_id = g.guest_id
    JOIN Rooms r ON rb.room_id = r.room_id
    ORDER BY p.payment_date DESC;
  `;

  db.query(q, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Add a new payment
router.post("/", (req, res) => {
  const { booking_id, payment_date, payment_method, payment_status, amount } = req.body;

  const q = `
    INSERT INTO Payments (booking_id, payment_date, payment_method, payment_status, amount)
    VALUES (?, ?, ?, ?, ?);
  `;

  db.query(q, [booking_id, payment_date, payment_method, payment_status, amount], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: "✅ Payment recorded successfully!",
      payment_id: result.insertId
    });
  });
});

// ✅ Update payment status or method
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { payment_status, payment_method } = req.body;

  const q = `
    UPDATE Payments 
    SET payment_status = ?, payment_method = ? 
    WHERE payment_id = ?;
  `;

  db.query(q, [payment_status, payment_method, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "💰 Payment details updated successfully!" });
  });
});

// ✅ Delete a payment record
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM Payments WHERE payment_id = ?;";

  db.query(q, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "🗑️ Payment deleted successfully!" });
  });
});

module.exports = router;
