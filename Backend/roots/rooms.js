const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all rooms
router.get("/", (req, res) => {
  db.query("SELECT * FROM Rooms", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Get available rooms only
router.get("/available", (req, res) => {
  db.query("SELECT * FROM Rooms WHERE status = 'Available'", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Get single room by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM Rooms WHERE room_id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Room not found" });
    res.json(result[0]);
  });
});

// ✅ Add a new room
router.post("/", (req, res) => {
  const { room_number, room_type, price_per_night, capacity, status } = req.body;
  db.query(
    "INSERT INTO Rooms (room_number, room_type, price_per_night, capacity, status) VALUES (?, ?, ?, ?, ?)",
    [room_number, room_type, price_per_night, capacity, status],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Room added successfully!", room_id: result.insertId });
    }
  );
});

// ✅ Update room details
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { room_number, room_type, price_per_night, capacity, status } = req.body;
  db.query(
    "UPDATE Rooms SET room_number=?, room_type=?, price_per_night=?, capacity=?, status=? WHERE room_id=?",
    [room_number, room_type, price_per_night, capacity, status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Room updated successfully!" });
    }
  );
});

// ✅ Update room status (after check-in or check-out)
router.put("/update-status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query("UPDATE Rooms SET status = ? WHERE room_id = ?", [status, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Room status updated successfully!" });
  });
});

// ✅ Delete room
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Rooms WHERE room_id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Room deleted successfully!" });
  });
});

module.exports = router;
