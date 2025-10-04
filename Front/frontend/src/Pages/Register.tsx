import React, { useState } from "react";
import api from "../API/api";
import { useNavigate } from "react-router-dom";

export function Register(){ 
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function navigateToLogin() {
        navigate("/login");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", { email, name, password });
            alert("Регистрация прошла успешно! Теперь войдите.");
            navigateToLogin();
        } catch (error) {
            alert("Ошибка регистрации");
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Имя</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Пароль</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Зарегистрироваться
                </button>
            </form>

            <button className="btn btn-link mt-3" onClick={navigateToLogin}>
                Уже есть аккаунт? Войти
            </button>
        </div>
    );
};

export default Register;
