import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-400">Resort Booking</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-400">
          About
        </Link>
        <Link to="/rooms" className="hover:text-blue-400">
          Rooms
        </Link>
        <Link to="/booking" className="hover:text-blue-400">
          Booking
        </Link>
        <Link to="/contact" className="hover:text-blue-400">
          Contact
        </Link>
      </div>
    </nav>
  );
}
