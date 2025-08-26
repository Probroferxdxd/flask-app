import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext.jsx";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 my-navbar">
      <h1 className="text-xl font-bold">Flask</h1>
      <div className="flex gap-4">
        <Link to="/">
          Inicio
        </Link>
        {user && (
          <Link to="/dashboard">
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
