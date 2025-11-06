import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ Your backend server URL
});

// Example API functions
export const getRooms = async () => {
  const res = await api.get("/rooms");
  return res.data;
};

export const getActivities = async () => {
  const res = await api.get("/activities");
  return res.data;
};

export const bookRoom = async (bookingData) => {
  const res = await api.post("/bookings/rooms", bookingData);
  return res.data;
};

export const bookActivity = async (activityData) => {
  const res = await api.post("/activities/book", activityData);
  return res.data;
};

export default api;
