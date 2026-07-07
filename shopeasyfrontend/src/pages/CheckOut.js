import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAddresses } from "../services/AddressService";
import { placeOrder } from "../services/OrderService";

function Checkout() {

    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState("");

    const [paymentMethod] = useState("CASH_ON_DELIVERY");

    useEffect(() => {

        loadAddresses();

    }, []);

    const loadAddresses = async () => {

        try {

            const data = await getAllAddresses();

            setAddresses(data);

            if (data.length > 0) {

                setSelectedAddress(data[0].id);

            }

        } catch (error) {

            console.log(error);

        }

    };

    const handlePlaceOrder = async () => {

        if (!selectedAddress) {

            alert("Please select an address");

            return;

        }

        try {

            await placeOrder({

                addressId: selectedAddress,

                paymentMethod: paymentMethod

            });

            alert("Order Placed Successfully");

            navigate("/orders");

        } catch (error) {

            console.log(error);

            alert("Unable to place order");

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">Checkout</h2>

            <div className="card p-4">

                <h4>Select Address</h4>

                {
    addresses.length === 0 ?

        <p>No Address Found</p>

        :

        addresses.map(address => (

            <div
                className="card mb-3 p-3"
                key={address.id}
            >

                <div className="form-check">

                    <input
                        className="form-check-input"
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                    />

                    <label className="form-check-label">

                        <h5>{address.fullName}</h5>

                        <p className="mb-1">

                            {address.houseNo},
                            {" "}
                            {address.street}

                            {address.landmark &&
                                `, ${address.landmark}`}

                        </p>

                        <p className="mb-1">

                            {address.city},
                            {" "}
                            {address.state}

                            {" - "}

                            {address.pincode}

                        </p>

                        <p className="mb-1">

                            {address.country}

                        </p>

                        <p>

                            📞 {address.phone}

                        </p>

                    </label>

                </div>

            </div>

        ))
}

                <hr />

                <h4>Payment Method</h4>

                <div className="form-check">

                    <input
                        className="form-check-input"
                        type="radio"
                        checked
                        readOnly
                    />

                    <label className="form-check-label">

                        Cash On Delivery

                    </label>

                </div>

                <button
                    className="btn btn-success mt-4"
                    onClick={handlePlaceOrder}
                >

                    Place Order

                </button>

            </div>

        </div>

    );

}

export default Checkout;