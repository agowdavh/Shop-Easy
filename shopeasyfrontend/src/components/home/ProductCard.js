import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import "./FeaturedProducts.css";
import { addToCart } from "../../services/CartService";

import { useNavigate } from "react-router-dom";
function ProductCard({product}) {
const navigate=useNavigate();
const handleAddToCart=async ()=>{
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


  return (
    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
      <div className="product-card">

        <div className="discount-badge">
          {product.discount}% OFF
        </div>

        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />

        <div className="product-body">

          <span className="product-category">
            {product.category}
          </span>

          <h5>{product.name}</h5>

          <div className="rating">
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
          </div>

          <div className="price">

            <span className="new-price">
              ₹{product.price}
            </span>

            <span className="old-price">
              ₹{product.oldPrice}
            </span>

          </div>

          <div className="product-buttons">

            <button className="wishlist-btn">
              <FaHeart />
            </button>

            <button className="cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart />
              Add to Cart
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;