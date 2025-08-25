import { createContext, useContext, useState } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const login = async (username, password) => {
        try {
            const res = await axios.post("https://dummyjson.com/user/login", {
                username,
                password
            })

            setUser(res.data)       // guarda todo el usuario que devuelve la API
            setToken(res.data.token) // guarda el token
            return true
        } catch (error) {
            console.error("Error en login:", error)
            return false
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
