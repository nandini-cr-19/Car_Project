import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { currentUser, role } = useAuth();

  if (!currentUser) {
    // Not logged in — redirect to login
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    // Logged in but not an admin — redirect to home
    return <Navigate to="/" />;
  }

  // All good — show admin page
  return children;
}
