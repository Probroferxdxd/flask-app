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
            className="flex items-center justify-center h-screen bg-gray-900 text-white login-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={"login-form"}>
                <form onSubmit={handleRegister} className="p-6 rounded-lg w-80 login-form">
                    <div className={"login-form-header"}>
            <span>
              <i className="fa-solid fa-user-plus"></i>
            </span>
                        <h2 className="text-2xl font-bold mb-4">Registro</h2>
                    </div>

                    <div className={"login-form-body"}>
                        <div className={"login-form-input"}>
                            <label htmlFor={"user"}>Usuario</label>
                            <div className={"bg-gray-800 login-input-container"}>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 mb-2 rounded text-black input-password bg-gray-800"
                                    required
                                />
                            </div>
                        </div>
                        <div className={"login-form-input"}>
                            <label htmlFor={"password"}>Contraseña</label>
                            <div className={"bg-gray-800 login-input-container"}>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 mb-2 rounded text-black input-password bg-gray-800"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className={"login-form-footer"}>
                        <p
                            onClick={() => navigate("/login")}
                            className="mt-4 text-sm cursor-pointer text-blue-400 hover:underline"
                        >
                            ¿Ya tienes cuenta? Inicia sesión
                        </p>
                    </div>

                    <div className={"login-button-section"}>
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 pt-4 rounded"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
            <div className={"login-image"}></div>
        </motion.div>
    );
}
