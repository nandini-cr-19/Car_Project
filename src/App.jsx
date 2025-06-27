import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

import Login from "./pages/Login";
import Marketplace from "./pages/Marketplace";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}