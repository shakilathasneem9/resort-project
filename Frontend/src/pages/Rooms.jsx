import { useEffect, useState } from "react";
import { getRooms } from "../utils/api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading rooms...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-blue-400 text-center mb-10">
        Available Rooms
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.room_id}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">
              {room.room_type}
            </h2>
            <p className="text-gray-400 mb-1">Room No: {room.room_number}</p>
            <p className="text-gray-400 mb-1">Capacity: {room.capacity}</p>
            <p className="text-gray-400 mb-3">
              Price: ₹{room.price_per_night}/night
            </p>
            <p
              className={`${
                room.status === "Available" ? "text-green-400" : "text-red-400"
              } font-semibold`}
            >
              {room.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
