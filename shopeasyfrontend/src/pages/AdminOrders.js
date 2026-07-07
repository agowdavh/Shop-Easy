import { useEffect, useState } from "react";
import {
    getAllOrders,
    updateOrderStatus
} from "../services/AdminService";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const data = await getAllOrders();

            setOrders(data);

        } catch (error) {

            console.log(error);

            alert("Unable to load orders");

        }

    };

    const handleStatusChange = async (id, status) => {

        try {

            await updateOrderStatus(id, status);

            alert("Order Status Updated");

            loadOrders();

        } catch (error) {

            console.log(error);

            alert("Unable to update order");

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4 text-center">

                Manage Orders

            </h2>

            {

                orders.length === 0 ?

                    <h4>No Orders Found</h4>

                    :

                    orders.map(order => (

                        <div
                            className="card shadow mb-4"
                            key={order.orderId}
                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between">

                                    <h5>

                                        Order #{order.orderId}

                                    </h5>

                                    <span className="badge bg-primary">

                                        {order.orderStatus}

                                    </span>

                                </div>

                                <hr />

                                {

                                    order.items.map(item => (

                                        <div
                                            className="row mb-2"
                                            key={item.productId}
                                        >

                                            <div className="col-md-5">

                                                {item.productName}

                                            </div>

                                            <div className="col-md-2">

                                                Qty : {item.quantity}

                                            </div>

                                            <div className="col-md-2">

                                                ₹ {item.price}

                                            </div>

                                            <div className="col-md-3">

                                                ₹ {item.subtotal}

                                            </div>

                                        </div>

                                    ))

                                }

                                <hr />

                                <p>

                                    <strong>

                                        Payment :

                                    </strong>

                                    {" "}

                                    {order.paymentMethod}

                                </p>

                                <p>

                                    <strong>

                                        Payment Status :

                                    </strong>

                                    {" "}

                                    {order.paymentStatus}

                                </p>

                                <p>

                                    <strong>

                                        Total :

                                    </strong>

                                    ₹ {order.totalAmount}

                                </p>

                                <div className="row mt-4">

                                    <div className="col-md-6">

                                        <select
                                            className="form-select"
                                            defaultValue={order.orderStatus}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.orderId,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="PLACED">

                                                PLACED

                                            </option>

                                            <option value="CONFIRMED">

                                                CONFIRMED

                                            </option>

                                            <option value="SHIPPED">

                                                SHIPPED

                                            </option>

                                            <option value="DELIVERED">

                                                DELIVERED

                                            </option>

                                            <option value="CANCELLED">

                                                CANCELLED

                                            </option>

                                        </select>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default AdminOrders;