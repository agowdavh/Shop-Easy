import "./FeaturedProducts.css";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../services/ProductService";
import { useState,useEffect } from "react";
function FeaturedProducts() {

  const [products,setProducts]=useState([]);
  useEffect(()=>{
    loadProducts();
  },[])

  const loadProducts=async ()=>{
    try{
      const data=await getAllProducts();
      setProducts(data);
    }
    catch(e){
      console.log(e);
      alert("unable to load products")
    }
  }

  
  return (

    <section className="featured-section">

      <div className="container">

        <h2 className="section-title">
          Featured Products
        </h2>

        <div className="row">

         {
            products.map(product=><ProductCard key={product.id} product={product}></ProductCard>)
         }

        </div>

      </div>

    </section>

  );

}

export default FeaturedProducts;