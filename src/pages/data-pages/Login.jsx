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
      <div className={"login-form"}>
        <form onSubmit={handleLogin} className="p-6 rounded-lg w-80 login-form">
          <div className={"login-form-header"}>
            <span className={"icon-item"}>
              <i className="fa-solid fa-flask"></i>
            </span>
            <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
          </div>
          {error && <p className="text-red-400">{error}</p>}

          <div className={"login-form-body"}>
            <div className={"login-form-input"}>
              <label htmlFor={"user"}>Usuario</label>
              <div className={"bg-gray-800 login-input-container"}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 mb-2 rounded text-black input-password bg-gray-800"
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
                />
              </div>
            </div>
          </div>
          <div className={"login-form-footer"}>
            {/* ✅ Checkbox custom reemplazando al <input> */}
            <div
              onClick={() => setRemember(!remember)}
              className={`
              flex items-center gap-2 mb-4 cursor-pointer select-none`}
            >
              {/* Caja del "checkbox" */}
              <div
                className={`
                  w-5 h-5 flex items-center justify-center rounded
                  border transition-colors
                  ${remember ? "bg-blue-600 border-blue-600" : "bg-gray-800 border-gray-600"}
                  `}
              >
                {remember && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {/* Texto */}
              <span className="text-sm text-gray-300">Recuérdame</span>
            </div>

            <p
              onClick={() => navigate("/register")}
              className="mt-4 text-sm cursor-pointer text-blue-400 hover:underline"
            >
              ¿No tienes cuenta? Regístrate
            </p>
          </div>

          <div className={"login-button-section"}>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 pt-4 rounded"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
      <div className={"login-image"}></div>
    </motion.div>
  );
}
