import api from "./api";

export const getAllAddresses = async () => {

    const response = await api.get("/address");

    return response.data;

};

export const addAddress = async (address) => {

    const response = await api.post("/address", address);

    return response.data;

};

export const updateAddress = async (id, address) => {

    const response = await api.put(`/address/${id}`, address);

    return response.data;

};

export const deleteAddress = async (id) => {

    const response = await api.delete(`/address/${id}`);

    return response.data;

};