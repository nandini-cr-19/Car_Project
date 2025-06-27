import { useNavigate } from "react-router-dom";
import { googleLogin } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { currentUser, role } = useAuth();

  const handleLogin = async () => {
    await googleLogin();
    navigate(role === "admin" ? "/admin" : "/");
  };

  if (currentUser) navigate(role === "admin" ? "/admin" : "/");

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Second‑Hand Car Platform</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  );
}