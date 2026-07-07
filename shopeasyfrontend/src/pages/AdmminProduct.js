import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllProducts,
    deleteProduct
} from "../services/ProductService";

function AdminProducts() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            const data = await getAllProducts();

            setProducts(data);

        } catch (error) {

            console.log(error);

            alert("Unable to load products");

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteProduct(id);

            alert("Product Deleted Successfully");

            loadProducts();

        } catch (error) {

            console.log(error);

            alert("Unable to delete product");

        }

    };

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Manage Products</h2>

                <Link
                    to="/admin/products/add"
                    className="btn btn-success"
                >
                    + Add Product
                </Link>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-bordered table-hover align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Image</th>

                                <th>Product</th>

                                <th>Brand</th>

                                <th>Price</th>

                                <th>Stock</th>

                                <th>Category</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                products.length === 0 ?

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center"
                                        >

                                            No Products Found

                                        </td>

                                    </tr>

                                    :

                                    products.map(product => (

                                        <tr key={product.id}>

                                            <td>{product.id}</td>

                                            <td>

                                                <img
                                                    src={
                                                        product.imageUrl ||
                                                        "https://placehold.co/80x80"
                                                    }
                                                    alt={product.productName}
                                                    width="70"
                                                    height="70"
                                                    className="rounded"
                                                />

                                            </td>

                                            <td>{product.productName}</td>

                                            <td>{product.brand}</td>

                                            <td>

                                                ₹ {product.price}

                                            </td>

                                            <td>

                                                {product.stock}

                                            </td>

                                            <td>

                                                {product.categoryName}

                                            </td>

                                            <td>

                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="btn btn-warning btn-sm me-2"
                                                >

                                                    Edit

                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(product.id)}
                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default AdminProducts;