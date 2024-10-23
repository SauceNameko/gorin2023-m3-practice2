import { useRef } from "react"

export const LoginScene = ({ loginCheck, message,  }) => {
    const userRef = useRef();
    const passRef = useRef();
    return (
        <>
            <input type="text" name="username" id="" ref={userRef} defaultValue={localStorage.getItem("username")} />
            <input type="text" name="password" id="" ref={passRef} />
            <button onClick={() => { loginCheck(userRef.current.value, passRef.current.value) }} >ログイン</button>
            {message != "" && <div className="message" style={{ color: "red" }} >{message}</div>}
        </>
    )
}