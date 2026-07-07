import { useEffect, useState } from "react"
import { getAllProducts } from "../services/ProductService"
import ProductCard from '../components/product/ProductCard'
function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts =async () => {
        const data =await getAllProducts();
        setProducts(data)
    }

    return (
        <div>

            <h1>Products Page</h1>
            <div>

                {products.map(product =>
                    <div
                        className="col-lg-3 col-md-4 col-sm-6 mb-4"
                        key={product.id}
                    >

                        <ProductCard product={product} />

                    </div>
                )}

            </div>

        </div>


    )
}

export default Products;