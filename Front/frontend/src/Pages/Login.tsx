import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "../helpers";
import { login } from "../API/loginApi";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);

            if (response.token) {
                setToken(response.token);
                console.log("Токен сохранён:", getToken());

                setTimeout(() => navigate("/interval"), 0);
            }
        } catch (error) {
            alert("Ошибка входа. Проверьте данные.");
            console.error(error);
        }
    };



    const navigateToRegister = () => {
        navigate("/register");
    }

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>

            <button className="btn btn-link mt-3" onClick={navigateToRegister}>
                У меня нет аккаунта
            </button>
        </div>
    );
};

// export default Login;
