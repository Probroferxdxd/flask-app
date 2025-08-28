// src/pages/data-pages/Dashboard.jsx
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import {motion} from "motion/react";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-red-600">Acceso denegado</h2>
                <p className="text-gray-600">Debes iniciar sesión primero.</p>
            </div>
        );
    }

    return (
        <motion.div
            className="p-6 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h2>

            <div className="border rounded p-4 mb-4 bg-gray-700">
                <p><strong>ID:</strong> {user.id || "—"}</p>
                <p><strong>Usuario:</strong> {user.username || "—"}</p>
                <p><strong>Email:</strong> {user.email || "—"}</p>
            </div>

            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Cerrar sesión
            </button>
        </motion.div>
    );
}
