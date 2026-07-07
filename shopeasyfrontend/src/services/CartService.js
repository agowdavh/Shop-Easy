import api from "./api"
export const addToCart=async (ProductById,quantity)=>{
   const response=await api.post(`/cart/add/${ProductById}/${quantity}`)
   return await response.data;
}

export const getCart=async ()=>{
    const response=await api.get("/cart");
    return response.data;
}

export const updateQuantity=async (cartId,quantity)=>{
    const response=await api.put(`/cart/update/${cartId}/${quantity}`)
    return response.data
}

export const deleteItem=async(cartId)=>{
    const response=await api.delete(`/cart/remove/${cartId}`)
    return response.data;
}

export const clearCart=async ()=>{
    const response=await api.delete("/cart/clear")
    return response.data;
}