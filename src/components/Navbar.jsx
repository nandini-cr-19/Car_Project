import { Link, useNavigate } from "react-router-dom";
import { logout } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">CarPlatform</Link>
      {currentUser && (
        <div className="flex items-center gap-4">
          {role === "admin" && <Link to="/admin">Dashboard</Link>}
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}