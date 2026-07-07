import api from "./api";

export const getDashboard = async () => {

    const response = await api.get("/admin/dashboard");

    return response.data;

};

export const getAllUsers = async () => {

    const response = await api.get("/admin/users");

    return response.data;

};

export const getAllOrders = async () => {

    const response = await api.get("/admin/orders");

    return response.data;

};

export const updateOrderStatus = async (id, status) => {

    const response = await api.put(
        `/admin/orders/${id}`,
        {
            status: status
        }
    );

    return response.data;

};
export const enableUser = async (id) => {

    const response = await api.put(`/admin/users/${id}/enable`);

    return response.data;

};

export const disableUser = async (id) => {

    const response = await api.put(`/admin/users/${id}/disable`);

    return response.data;

};