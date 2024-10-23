import { path } from "./path"

export const LogoutApi = async () => {

    const res = await fetch(`${path}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
    const data = await res.json();
    return data;
}