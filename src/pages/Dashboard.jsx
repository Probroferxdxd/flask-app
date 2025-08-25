import { motion } from "motion/react"
import { useAuth } from "../context/AuthContext"

export default function Dashboard() {
    const { user, logout } = useAuth()

    return (
        <motion.div
            className="p-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold mb-4">Bienvenido {user?.email} 🎉</h2>
            <p>Este es tu panel privado.</p>
            <button
                onClick={logout}
                className="mt-4 p-2 bg-red-500 rounded hover:bg-red-600 transition"
            >
                Cerrar sesión
            </button>
        </motion.div>
    )
}
