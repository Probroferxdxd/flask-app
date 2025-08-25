import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { motion } from "motion/react"

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await login(username, password)
        if (success) {
            navigate("/dashboard")
        } else {
            alert("Credenciales inválidas")
        }
    }

    return (
        <motion.div
            className="p-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold mb-4">Iniciar Sesión 🔑</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
                <input
                    type="text"
                    placeholder="Usuario"
                    className="p-2 rounded bg-gray-700 focus:outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="p-2 rounded bg-gray-700 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="p-2 bg-red-500 rounded hover:bg-red-600 transition"
                >
                    Entrar
                </button>
            </form>
        </motion.div>
    )
}