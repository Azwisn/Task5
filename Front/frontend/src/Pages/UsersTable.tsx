import React, { useEffect, useState, useCallback } from "react";
import { getToken, clearToken } from "../helpers";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../API/userApi";

interface User {
    id: number;
    email: string;
    name: string;
    status: string;
    lastLogin?: string;
}

const UsersTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    const loadUsers = useCallback(async () => {
        const token = getToken();
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await getAllUsers();
            setUsers(response);
        } catch (error: any) {
            if (error.response?.status === 401) {
                clearToken();
                navigate("/login");
            } else {
                console.error("Ошибка при загрузке пользователей:", error);
            }
        }
    }, [navigate]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    return (
        <div className="container mt-5">
            <h2>Пользователи</h2>
            <button
                className="btn btn-secondary mb-3"
                onClick={() => {
                    clearToken();
                    navigate("/login");
                }}
            >
                Logout
            </button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Имя</th>
                        <th>Статус</th>
                        <th>Последний вход</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr
                            key={u.id}
                            className={u.status === "blocked" ? "text-muted" : ""}
                            style={{ textDecoration: u.status === "blocked" ? "line-through" : "none" }}
                        >
                            <td>{u.email}</td>
                            <td>{u.name}</td>
                            <td>{u.status}</td>
                            <td>
                                {u.lastLogin
                                    ? new Date(u.lastLogin).toLocaleString()
                                    : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
