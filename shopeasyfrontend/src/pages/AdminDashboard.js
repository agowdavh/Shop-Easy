import { useEffect, useState } from "react";
import { getDashboard } from "../services/AdminService.js";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboard();

            setDashboard(data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to load dashboard");

        }

    };

    if (!dashboard) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-5">

                Admin Dashboard

            </h2>

            <div className="row">

                <div className="col-md-4 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Users</h5>

                            <h2 className="text-primary">

                                {dashboard.totalUsers}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Products</h5>

                            <h2 className="text-success">

                                {dashboard.totalProducts}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Categories</h5>

                            <h2 className="text-warning">

                                {dashboard.totalCategories}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-6 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Orders</h5>

                            <h2 className="text-danger">

                                {dashboard.totalOrders}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-6 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Revenue</h5>

                            <h2 className="text-success">

                                ₹ {dashboard.totalRevenue}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;