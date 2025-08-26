// src/utils/utils.js

// Clave en localStorage donde guardamos los usuarios registrados
const LOCAL_USERS_KEY = "local_users";

// Obtener usuarios de localStorage
export function getLocalUsers() {
    const users = localStorage.getItem(LOCAL_USERS_KEY);
    return users ? JSON.parse(users) : [];
}

// Guardar un nuevo usuario en localStorage
export function registerLocalUser(newUser) {
    const users = getLocalUsers();
    users.push(newUser);
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

// Intentar login contra DummyJSON
export async function loginDummyJSON(username, password) {
    try {
        const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) return null;
        const data = await res.json();
        return data; // devuelve token y user
    } catch (err) {
        console.error("Error login DummyJSON", err);
        return null;
    }
}

// Intentar login contra usuarios locales
export function loginLocal(username, password) {
    const users = getLocalUsers();
    const user = users.find(
        (u) => u.username === username && u.password === password
    );
    return user || null;
}

export function saveUserSession(user, remember) {
    if (remember) {
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        sessionStorage.setItem("user", JSON.stringify(user));
    }
}

export function getUserSession() {
    return (
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"))
    );
}

export function clearUserSession() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
}

