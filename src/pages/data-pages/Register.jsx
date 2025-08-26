import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerLocalUser } from "../../utils/auth.js";
import {motion} from "motion/react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = { username, password };
        registerLocalUser(newUser);

        alert("Usuario registrado con éxito");
        navigate("/login");
    };

    return (
        <motion.div
            className="flex items-center justify-center h-screen bg-gray-900 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form
                onSubmit={handleRegister}
                className="bg-gray-800 p-6 rounded-lg shadow-md w-80"
            >
                <h2 className="text-2xl font-bold mb-4">Registro</h2>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-2 rounded text-black"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 rounded text-black"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 p-2 rounded"
                >
                    Registrarse
                </button>
                <p
                    onClick={() => navigate("/login")}
                    className="mt-4 text-sm cursor-pointer text-blue-400 hover:underline"
                >
                    ¿Ya tienes cuenta? Inicia sesión
                </p>
            </form>
        </motion.div>
    );
}
