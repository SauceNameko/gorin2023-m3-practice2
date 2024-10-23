import { path } from "./path"

export const LoginApi = async (username, password) => {
    const res = await fetch(`${path}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
    })
    const data = await res.json();

    if (data == false) {
        return data;
    } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        return data;
    }
}