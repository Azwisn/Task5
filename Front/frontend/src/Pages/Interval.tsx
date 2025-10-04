import React from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../helpers";

const Interval: React.FC = () => {
    const navigate = useNavigate();

    const handleGoToUsers = () => {
        const token = getToken();
        if (!token) {
            navigate("/login");
            return;
        }
        navigate("/users");
    };



    const handleLogout = () => {
        clearToken();
        navigate("/login");
    };

    return (
        <div className="container mt-5 text-center">
            <h2 className="mb-4">Добро пожаловать! 🎉</h2>
            <p className="text-muted">Вы успешно вошли в систему.</p>

            <div className="mt-4">
                <button className="btn btn-primary me-3" onClick={handleGoToUsers}>
                    Перейти к пользователям
                </button>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Выйти
                </button>
            </div>
        </div>
    );
};

export default Interval;
