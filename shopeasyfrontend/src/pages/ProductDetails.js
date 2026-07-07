import { useParams,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { getProductById } from "../services/ProductService";
import { addToCart } from "../services/CartService";
function ProductDetails(){

    const navigate=useNavigate();
    const {id}=useParams();

    const [product,setProduct]=useState(null);

    useEffect(()=>{
         loadProduct(id);
    },[])


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

    const loadProduct=async (id)=>{
        try{
            const data= await getProductById(id)
        setProduct(data);
        }
        catch(error){
            console.log(error);
        }
    }

 if (!product) {

        return <h2 className="text-center mt-5">Loading...</h2>;

    }

    return(
        <div className="container py-5">

            <div className="row">

                <div className="col-md-6">

                    <img
                        src={product.imageUrl?product.imageUrl:"https://placehold.co/500x500"}
                        alt={product.productName}
                        className="img-fluid rounded"
                    />

                </div>

                <div className="col-md-6">

                    <h2>{product.productName}</h2>

                    <p>{product.brand}</p>

                    <h3 className="text-success">

                        ₹ {product.price}

                    </h3>

                    <p>{product.description}</p>

                    <button className="btn btn-primary me-3" onClick={handleAddToCart}>

                        Add To Cart

                    </button>

                </div>

            </div>

        </div>


    )
}
export default ProductDetails;