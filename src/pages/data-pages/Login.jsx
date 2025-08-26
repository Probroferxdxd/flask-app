import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginLocal, loginDummyJSON } from "../../utils/auth.js";
import { useAuth } from "../../utils/AuthContext.jsx"; // 👈 importar el contexto
import { motion } from "motion/react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false); // 👈 recordar sesión
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { login } = useAuth(); // 👈 obtenemos la función login del contexto

    const handleLogin = async (e) => {
        e.preventDefault();

        // 1. Intentar login con DummyJSON
        const dummyUser = await loginDummyJSON(username, password);
        if (dummyUser) {
            login(dummyUser, remember); // 👈 guardamos en el contexto
            return navigate("/dashboard");
        }

        // 2. Intentar login con usuarios locales
        const localUser = loginLocal(username, password);
        if (localUser) {
            login(localUser, remember); // 👈 guardamos en el contexto
            return navigate("/dashboard");
        }

        setError("Usuario o contraseña incorrectos");
    };

    return (
        <motion.div
            className="flex items-center justify-center h-screen bg-gray-900 text-white login-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form
                onSubmit={handleLogin}
                className="bg-gray-800 p-6 rounded-lg shadow-md w-80 login-form"
            >
                <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
                {error && <p className="text-red-400">{error}</p>}

                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-2 rounded text-black input-password"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-2 rounded text-black input-password"
                />

                {/* Checkbox Remember Me */}
                <label className="flex items-center space-x-2 mb-4">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    <span>Recordarme</span>
                </label>

                <div className={"login-button-section"}>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
                    >
                        Login
                    </button>
                </div>

                <p
                    onClick={() => navigate("/register")}
                    className="mt-4 text-sm cursor-pointer text-blue-400 hover:underline"
                >
                    ¿No tienes cuenta? Regístrate
                </p>
            </form>
        </motion.div>
    );
}
