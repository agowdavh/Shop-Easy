import api from "./api";

export const placeOrder = async (orderData) => {

    const response = await api.post("/orders/place", orderData);

    return response.data;

};

export const getMyOrders = async () => {

    const response = await api.get("/orders");

    return response.data;

};

export const getOrderById = async (id) => {

    const response = await api.get(`/orders/${id}`);

    return response.data;

};

export const cancelOrder = async (id) => {

    const response = await api.put(`/orders/${id}/cancel`);

    return response.data;

};