import { useEffect, useState } from "react";
import {
    getAllAddresses,
    addAddress,
    updateAddress,
    deleteAddress
} from "../services/AddressService";

function Address() {

    const [addresses, setAddresses] = useState([]);

    const [editing, setEditing] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const initialForm = {
        fullName: "",
        phone: "",
        houseNo: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        defaultAddress: false
    };

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {

        try {

            const data = await getAllAddresses();

            setAddresses(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });

    };

    const resetForm = () => {

        setEditing(false);

        setEditingId(null);

        setFormData(initialForm);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editing) {

                await updateAddress(editingId, formData);
                
                alert("Address Updated Successfully");

            } else {

                await addAddress(formData);

                alert("Address Added Successfully");

            }

            resetForm();

            loadAddresses();

        } catch (error) {

            console.log(error);

            alert("Operation Failed");

        }

    };

    const handleEdit = (address) => {

        setEditing(true);

        setEditingId(address.id);

        setFormData({
            fullName: address.fullName,
            phone: address.phone,
            houseNo: address.houseNo,
            street: address.street,
            landmark: address.landmark || "",
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            country: address.country,
            defaultAddress: address.defaultAddress
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this address?")) {

            return;

        }

        try {

            await deleteAddress(id);

            alert("Address Deleted");

            loadAddresses();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4 text-center">

                My Addresses

            </h2>

            <div className="row">

                {/* Form */}

                <div className="col-md-5">

                    <div className="card p-4 shadow">

                        <h4 className="text-center mb-3">

                            {editing ? "Update Address" : "Add Address"}

                        </h4>

                        <form onSubmit={handleSubmit}>

                            <input
                                className="form-control mb-2"
                                placeholder="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="House No"
                                name="houseNo"
                                value={formData.houseNo}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="Street"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="Landmark"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="Pincode"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />

                            <div className="form-check mb-3">

                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="defaultAddress"
                                    checked={formData.defaultAddress}
                                    onChange={handleChange}
                                />

                                <label className="form-check-label">

                                    Default Address

                                </label>

                            </div>

                            <button
                                className={`btn w-100 ${editing ? "btn-warning" : "btn-primary"}`}
                            >

                                {editing ? "Update Address" : "Save Address"}

                            </button>

                            {

                                editing &&

                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 mt-2"
                                    onClick={resetForm}
                                >

                                    Cancel

                                </button>

                            }

                        </form>

                    </div>

                </div>

                {/* Address List */}

                <div className="col-md-7">

                    {

                        addresses.length === 0 ?

                            <h4>No Addresses Found</h4>

                            :

                            addresses.map(address => (

                                <div
                                    className="card mb-3 shadow-sm"
                                    key={address.id}
                                >

                                    <div className="card-body">

                                        <h5>{address.fullName}</h5>

                                        <p>

                                            {address.houseNo}, {address.street}

                                            {

                                                address.landmark &&
                                                `, ${address.landmark}`

                                            }

                                        </p>

                                        <p>

                                            {address.city},

                                            {" "}

                                            {address.state}

                                            {" - "}

                                            {address.pincode}

                                        </p>

                                        <p>{address.country}</p>

                                        <p>{address.phone}</p>

                                        {

                                            address.defaultAddress &&

                                            <span className="badge bg-success">

                                                Default

                                            </span>

                                        }

                                        <br />

                                        <br />

                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => handleEdit(address)}
                                        >

                                            Edit

                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(address.id)}
                                        >

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            ))

                    }

                </div>

            </div>

        </div>

    );

}

export default Address;