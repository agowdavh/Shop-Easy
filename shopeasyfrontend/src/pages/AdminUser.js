import { useEffect, useState } from "react";
import {
    getAllUsers,
    enableUser,
    disableUser
} from "../services/AdminService";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const data = await getAllUsers();

            setUsers(data);

        } catch (error) {

            console.log(error);

            alert("Unable to load users");

        }

    };

    const handleEnable = async (id) => {

        try {

            await enableUser(id);

            alert("User Enabled");

            loadUsers();

        } catch (error) {

            console.log(error);

        }

    };

    const handleDisable = async (id) => {

        try {

            await disableUser(id);

            alert("User Disabled");

            loadUsers();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                Manage Users

            </h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map(user => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>

                                    {user.firstName} {user.lastName}

                                </td>

                                <td>{user.email}</td>

                                <td>{user.phone}</td>

                                <td>{user.role}</td>

                                <td>

                                    {

                                        user.enabled ?

                                            <span className="badge bg-success">

                                                Enabled

                                            </span>

                                            :

                                            <span className="badge bg-danger">

                                                Disabled

                                            </span>

                                    }

                                </td>

                                <td>

                                    {

                                        user.enabled ?

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDisable(user.id)}
                                            >

                                                Disable

                                            </button>

                                            :

                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleEnable(user.id)}
                                            >

                                                Enable

                                            </button>

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AdminUsers;