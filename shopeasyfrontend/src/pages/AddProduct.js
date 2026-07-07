import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    addProduct,
    updateProduct,
    getProductById
} from "../services/ProductService";

import { getAllCategories } from "../services/CategoryService";

function AddProduct() {

    const navigate = useNavigate();

    const { id } = useParams();

    const editing = id !== undefined;

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({

        productName: "",

        description: "",

        brand: "",

        price: "",

        discount: 0,

        stock: "",

        imageUrl: "",

        active: true,

        categoryId: ""

    });

    useEffect(() => {

        loadCategories();

        if (editing) {

            loadProduct();

        }

    }, []);

    const loadCategories = async () => {

        try {

            const data = await getAllCategories();

            setCategories(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const loadProduct = async () => {

        try {

            const data = await getProductById(id);

            setFormData({

                productName: data.productName,

                description: data.description,

                brand: data.brand,

                price: data.price,

                discount: data.discount,

                stock: data.stock,

                imageUrl: data.imageUrl,

                active: data.active,

                categoryId: data.categoryId

            });

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value, checked, type } = e.target;

        setFormData({

            ...formData,

            [name]: type === "checkbox" ? checked : value

        });

    }
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editing) {

                await updateProduct(id, formData);

                alert("Product Updated Successfully");

            }

            else {

                await addProduct(formData);

                alert("Product Added Successfully");

            }

            navigate("/admin/products");

        }

        catch (error) {

            console.log(error);

            alert("Unable to Save Product");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                        <div className="card-header bg-dark text-white">

                            <h3>

                                {

                                    editing ?

                                        "Update Product"

                                        :

                                        "Add Product"

                                }

                            </h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <input
                                    className="form-control mb-3"
                                    placeholder="Product Name"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    required
                                />

                                <textarea
                                    className="form-control mb-3"
                                    rows="3"
                                    placeholder="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    placeholder="Brand"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="row">

                                    <div className="col-md-4">

                                        <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="Price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-4">

                                        <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="Discount %"
                                            name="discount"
                                            value={formData.discount}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-4">

                                        <input
                                            type="number"
                                            className="form-control mb-3"
                                            placeholder="Stock"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                <input
                                    className="form-control mb-3"
                                    placeholder="Image URL"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                />

                                {

                                    formData.imageUrl &&

                                    <div className="mb-3">

                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="img-thumbnail"
                                            style={{ width: "200px" }}
                                        />

                                    </div>

                                }

                                <select
                                    className="form-select mb-3"
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">

                                        Select Category

                                    </option>

                                    {

                                        categories.map(category => (

                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >

                                                {category.categoryName}

                                            </option>

                                        ))

                                    }

                                </select>

                                <div className="form-check mb-4">

                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                    />

                                    <label className="form-check-label">

                                        Product Active

                                    </label>

                                </div>

                                <button className="btn btn-success w-100">

                                    {

                                        editing ?

                                            "Update Product"

                                            :

                                            "Add Product"

                                    }

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddProduct;