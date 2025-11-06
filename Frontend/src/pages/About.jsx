export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 md:px-20 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          About TranquilTrails Resort
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          Nestled between lush green hills and crystal-clear waters,
          TranquilTrails Resort offers the perfect blend of relaxation and
          adventure. Our mission is to provide guests with an unforgettable
          experience through comfort, nature, and thrill.
        </p>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            What Makes Us Special
          </h2>
          <ul className="text-left space-y-3 text-gray-300">
            <li>🌿 Eco-friendly resort surrounded by nature.</li>
            <li>🏠 Luxury rooms with sea and mountain views.</li>
            <li>🌊 Exciting water sports and guided treks.</li>
            <li>🍽️ World-class dining with local and continental cuisine.</li>
            <li>🤝 Personalized hospitality and curated guest experiences.</li>
          </ul>
        </div>

        <p className="text-gray-400 mt-10 text-sm">
          © 2025 TranquilTrails Resort. All rights reserved.
        </p>
      </div>
    </div>
  );
}
