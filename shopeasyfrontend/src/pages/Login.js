import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/AuthService";
import { useState } from "react";
function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })


    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await login(formData);
            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.role);

            alert("successfully Login");
            navigate("/")

        }
        catch (error) {
            console.log(error);
            alert("invalid email / password")
        }

    }

    return (<div className="container mt-5">

        <div className="row justify-content-center">

            <div className="col-md-5">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="text-center mb-4">

                            Login

                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>Email</label>

                                <input

                                    type="email"

                                    name="email"

                                    className="form-control"

                                    value={formData.email}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input

                                    type="password"

                                    name="password"

                                    className="form-control"

                                    value={formData.password}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <button

                                className="btn btn-primary w-100"

                                type="submit"

                            >

                                Login

                            </button>

                        </form>

                        <p className="mt-3 text-center">

                            Don't have an account?

                            <Link to="/register">

                                Register

                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    </div>

    )


}

export default Login;