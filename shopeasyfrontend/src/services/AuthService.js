import api from "./api";

export const login=async(logindata)=>{
    const response=await api.post("/auth/login",logindata)
    return response.data;
}

export const register=async(registerdata)=>{
    const response=await api.post("/auth/register",registerdata)
    return response.data;
}