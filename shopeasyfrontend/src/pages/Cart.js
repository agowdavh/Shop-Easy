import {
    getCart,
    updateQuantity,
    deleteItem,
    clearCart
} from "../services/CartService";

import { useEffect,useState } from "react";
import { useNavigate,Link } from "react-router-dom";

function Cart(){

    const navigate=useNavigate();
    const [cart,setCart]=useState(null);
useEffect(()=>{
    loadCart()
},[])

const loadCart=async ()=>{
   try{
    const data= await getCart();
   setCart(data);
   }
   catch(error){
    console.log(error);
   }
}

const increaseQuantity=async (item)=>{
    await updateQuantity(item.id,item.quantity+1);
    loadCart()
}

const decreaseQuantity=async (item)=>{
    if(item.quantity==1){
        return
    }

    await updateQuantity(item.id,item.quantity-1);
    loadCart()
}

const deleteItem1=async (cartItemId)=>{
    await deleteItem(cartItemId);
    loadCart()

}

const deleteCart=async ()=>{
    await clearCart();
    loadCart()
}

if (!cart) {

        return <h2 className="text-center mt-5">Loading...</h2>;

    }

     return (

        <div className="container mt-5">

            <h2 className="mb-4">My Cart</h2>

            {
                cart.items.length === 0 ?

                    <h4>Your Cart is Empty</h4>

                    :

                    <>
                        {
                            cart.items.map(item => (

                                <div
                                    className="card mb-3"
                                    key={item.id}
                                >

                                    <div className="card-body">

                                        <div className="row align-items-center">

                                            <div className="col-md-2">

                                                <img
                                                     src={item.imageUrl || "https://placehold.co/150x150"}
                                                    className="img-fluid"
                                                    alt={item.productName}
                                                />

                                            </div>

                                            <div className="col-md-3">

                                                <h5>{item.productName}</h5>

                                            </div>

                                            <div className="col-md-2">

                                                ₹ {item.price}

                                            </div>

                                            <div className="col-md-3">

                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => decreaseQuantity(item)}
                                                >
                                                    -
                                                </button>

                                                <span className="mx-3">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => increaseQuantity(item)}
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <div className="col-md-2">

                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => deleteItem1(item.id)}
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))
                        }

                        <div className="card p-4">

                            <h4>Total Items : {cart.totalItems}</h4>

                            <h4>Total Amount : ₹ {cart.totalAmount}</h4>

                            <div className="mt-3">

                                <button
                                    className="btn btn-danger me-3"
                                    onClick={deleteCart}
                                >
                                    Clear Cart
                                </button>

                                <button
                                    className="btn btn-success"
                                    onClick={() => navigate("/checkout")}
                                >
                                    Checkout
                                </button>

                            </div>

                        </div>

                    </>
            }

        </div>

    );



}
export default Cart;