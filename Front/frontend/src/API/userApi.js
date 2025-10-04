import api from "./api";

export async function getAllUsers() {
    const response = await api.get("/users");
    return response.data;
}

export async function performAction(action, ids) {
    const response = await api.post(`/users/${action}`, ids);
    return response.data;
}