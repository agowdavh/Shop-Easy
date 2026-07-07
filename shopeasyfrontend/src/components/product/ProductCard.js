import "./ProductCard.css";
import { Link,useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { addToCart } from "../../services/CartService";
function ProductCard({product}){
const navigate =useNavigate();
const  handleAddToCart=async ()=>{
        const token=localStorage.getItem("token");
        if(token===null){
            alert("please login first");
            navigate("/");
            return;

        }
        try{
            await addToCart(product.id,1);
            alert("product added successfully")
        }
        catch(error){
            alert("enable to add to cart")
        }


    }

    return(
         <div className="product-card">

            <div className="product-image">

                <img
                    src={product.imageUrl?product.imageUrl:"https://placehold.co/300x300"}
                    alt={product.productName}
                />

                {product.discount > 0 && (
                    <span className="discount-badge">
                        {product.discount}% OFF
                    </span>
                )}

            </div>

            <div className="product-content">

                <h5>{product.productName}</h5>

                <p className="brand">{product.brand}</p>

                <h4>₹ {product.price}</h4>

                <div className="product-buttons">

                    <button className="cart-btn" onClick={handleAddToCart}>
                        <FaShoppingCart /> Add to Cart
                    </button>

                    <Link
                        to={`/products/${product.id}`}
                        className="view-btn"
                    >
                        <FaEye /> View
                    </Link>

                </div>

            </div>

        </div>
    )
}



export default ProductCard;