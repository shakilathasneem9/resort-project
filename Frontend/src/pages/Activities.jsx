export default function Activities() {
  const activities = [
    {
      id: 1,
      name: "Scuba Diving",
      type: "Water Adventure",
      description:
        "Dive into the deep blue and explore vibrant coral reefs with certified instructors.",
      duration: "90 mins",
      price: "₹2,500 per person",
      difficulty: "Moderate",
    },
    {
      id: 2,
      name: "Mountain Trek",
      type: "Land Adventure",
      description:
        "A guided hike through scenic mountain trails with panoramic views of the valley.",
      duration: "3 hours",
      price: "₹1,800 per person",
      difficulty: "Hard",
    },
    {
      id: 3,
      name: "Kayaking",
      type: "Water Sport",
      description:
        "Paddle your way through calm backwaters surrounded by lush greenery.",
      duration: "60 mins",
      price: "₹1,200 per person",
      difficulty: "Easy",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-10">
        Resort Activities
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">
              {activity.name}
            </h2>
            <p className="text-sm text-gray-400 mb-3">{activity.type}</p>
            <p className="text-gray-300 mb-4">{activity.description}</p>
            <ul className="text-sm text-gray-400 mb-4 space-y-1">
              <li>🕒 Duration: {activity.duration}</li>
              <li>💰 Price: {activity.price}</li>
              <li>🔥 Difficulty: {activity.difficulty}</li>
            </ul>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
