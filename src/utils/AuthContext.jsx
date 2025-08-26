import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // 🔹 Cargar usuario desde localStorage o sessionStorage al inicio
    useEffect(() => {
        const storedUser =
            JSON.parse(localStorage.getItem("user")) ||
            JSON.parse(sessionStorage.getItem("user"));

        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // 🔹 Login con opción remember
    const login = (userData, remember = false) => {
        setUser(userData);

        if (remember) {
            localStorage.setItem("user", JSON.stringify(userData));
            sessionStorage.removeItem("user");
        } else {
            sessionStorage.setItem("user", JSON.stringify(userData));
            localStorage.removeItem("user");
        }
    };

    // 🔹 Logout (borra de ambos storages)
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

