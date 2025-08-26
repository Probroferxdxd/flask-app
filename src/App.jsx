import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/principal-pages/Home.jsx";
import Login from "./pages/data-pages/Login.jsx";
import Register from "./pages/data-pages/Register.jsx";
import Dashboard from "./pages/ui-user-pages/Dashboard.jsx";
import { useAuth } from "./utils/AuthContext.jsx";

// Ruta protegida
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-white main-content">
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
