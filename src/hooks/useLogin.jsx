import { useState } from "react"
import { LoginApi } from "../api/LoginApi";
import { LogoutApi } from "../api/LogoutApi";

export const useLogin = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [message, setMessage] = useState("");

    //ログイン処理
    const loginCheck = (username, password) => {
        const check = async () => {
            const data = await LoginApi(username, password);
            if (data.username) {
                setIsLogin(true);
                setMessage("");
                return;
            } else {
                setMessage(data.message);
            }
        }
        check();
    }
    //ログアウト処理
    const logout = () => {
        const check = async () => {
            const data = await LogoutApi();

            if (data.success) {

                setIsLogin(false);
                setMessage("");
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                return;
            } else {
                setMessage(data.message);
            }

        }
        check();
    }

    return { isLogin, loginCheck, message, logout, };
}