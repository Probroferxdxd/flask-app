import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../../utils/AuthContext.jsx";

const generateId = () => `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            return setError("Todos los campos son obligatorios");
        }

        const newUser = {
            id: generateId(),
            username,
            email,
            password,
        };

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        login(newUser);
        navigate("/dashboard");
    };

    return (
        <motion.div
            className="flex items-center justify-center h-screen bg-gray-900 text-white register-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="register-form">
                <form onSubmit={handleRegister} className="p-6 rounded-lg w-80 register-form">
                    <div className="register-form-header">
                        <span className={"icon-item"}>
                            <i className="fa-solid fa-user-plus"></i>
                        </span>
                        <h2 className="text-2xl font-bold mb-4">Registro</h2>
                    </div>
                    {error && <p className="text-red-400">{error}</p>}

                    <div className="register-form-body">
                        <div className="register-form-input">
                            <label htmlFor="user">Usuario</label>
                            <div className="bg-gray-800 register-input-container">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 mb-2 rounded text-black bg-gray-800"
                                />
                            </div>
                        </div>
                        <div className="register-form-input">
                            <label htmlFor="email">Correo electrónico</label>
                            <div className="bg-gray-800 register-input-container">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 mb-2 rounded text-black bg-gray-800"
                                />
                            </div>
                        </div>
                        <div className="register-form-input">
                            <label htmlFor="password">Contraseña</label>
                            <div className="bg-gray-800 register-input-container">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 mb-2 rounded text-black bg-gray-800"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="register-form-footer">
                        <p
                            onClick={() => navigate("/login")}
                            className="mt-4 text-sm cursor-pointer text-blue-400 hover:underline"
                        >
                            ¿Ya tienes cuenta? Inicia sesión
                        </p>
                    </div>
                    <div className="register-button-section">
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 pt-4 rounded"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
            <div className="register-image"></div>
        </motion.div>
    );
}
