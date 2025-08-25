import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/App.scss";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();

  return (
    <motion.div
      className="text-center my-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="text-center home-section">
        <h1 className={"font-bold w-6/10 text-6xl"}>
          Preparación académica preuniversitaria: tu camino hacia la universidad
        </h1>
        <h2 className={"text-2xl w-4/10"}>
          Domina los temas clave y asegura tu cupo en la universidad de tus
          sueños.
        </h2>
        <div className={"flex gap-4 home-button-section"}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} >
            <Link to="/login">
              Iniciar Sesión
            </Link>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
            Registrarse
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
