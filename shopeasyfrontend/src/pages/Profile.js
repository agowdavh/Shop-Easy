import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/UserService";

function Profile() {

    const [user, setUser] = useState(null);

    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const data = await getProfile();

            setUser(data);

            setFormData({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone
            });

        } catch (error) {

            console.log(error);

            alert("Unable to load profile");

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleUpdate = async () => {

        try {

            await updateProfile(formData);

            alert("Profile Updated Successfully");

            setEditing(false);

            loadProfile();

        } catch (error) {

            console.log(error);

            alert("Unable to update profile");

        }

    };

    if (!user) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white text-center">

                            <h2>My Profile</h2>

                        </div>

                        <div className="card-body">

                            <div className="row mb-4">

                                <div className="col-md-6">

                                    <label className="fw-bold">

                                        First Name

                                    </label>

                                    {
                                        editing ?

                                            <input
                                                className="form-control"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />

                                            :

                                            <p>{user.firstName}</p>

                                    }

                                </div>

                                <div className="col-md-6">

                                    <label className="fw-bold">

                                        Last Name

                                    </label>

                                    {
                                        editing ?

                                            <input
                                                className="form-control"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />

                                            :

                                            <p>{user.lastName}</p>

                                    }

                                </div>

                            </div>

                            <div className="row mb-4">

                                <div className="col-md-6">

                                    <label className="fw-bold">

                                        Email

                                    </label>

                                    <input
                                        className="form-control"
                                        value={user.email}
                                        disabled
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label className="fw-bold">

                                        Phone

                                    </label>

                                    {
                                        editing ?

                                            <input
                                                className="form-control"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />

                                            :

                                            <p>{user.phone}</p>

                                    }

                                </div>

                            </div>

                            <div className="row mb-4">

                                <div className="col-md-6">

                                    <label className="fw-bold">

                                        Role

                                    </label>

                                    <p>{user.role}</p>

                                </div>

                                <div className="col-md-6">

                                    <label className="fw-bold">

                                        Status

                                    </label>

                                    <br />

                                    {
                                        user.enabled ?

                                            <span className="badge bg-success">

                                                Active

                                            </span>

                                            :

                                            <span className="badge bg-danger">

                                                Disabled

                                            </span>

                                    }

                                </div>

                            </div>

                            <div className="text-center">

                                {
                                    editing ?

                                        <>

                                            <button
                                                className="btn btn-success me-3"
                                                onClick={handleUpdate}
                                            >

                                                Save Changes

                                            </button>

                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => setEditing(false)}
                                            >

                                                Cancel

                                            </button>

                                        </>

                                        :

                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setEditing(true)}
                                        >

                                            Edit Profile

                                        </button>

                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;