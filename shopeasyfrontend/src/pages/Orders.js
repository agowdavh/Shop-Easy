import { useEffect, useState } from "react";
import { getMyOrders, cancelOrder } from "../services/OrderService";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const data = await getMyOrders();

            setOrders(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleCancelOrder = async (orderId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) {

            return;

        }

        try {

            await cancelOrder(orderId);

            alert("Order Cancelled Successfully");

            loadOrders();

        } catch (error) {

            console.log(error);

            alert("Unable to cancel order");

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">

                My Orders

            </h2>

            {

                orders.length === 0 ?

                    <h4>No Orders Found</h4>

                    :

                    orders.map(order => (

                        <div
                            className="card mb-4 shadow-sm"
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
                                            className="row mb-3"
                                            key={item.productId}
                                        >

                                            <div className="col-md-5">

                                                <strong>

                                                    {item.productName}

                                                </strong>

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

                                        Order Date :

                                    </strong>

                                    {" "}

                                    {new Date(order.orderDate).toLocaleString()}

                                </p>

                                <h5 className="text-success">

                                    Total : ₹ {order.totalAmount}

                                </h5>

                                {

                                    order.orderStatus !== "CANCELLED" && (

                                        <button
                                            className="btn btn-danger mt-3"
                                            onClick={() => handleCancelOrder(order.orderId)}
                                        >

                                            Cancel Order

                                        </button>

                                    )

                                }

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default Orders;