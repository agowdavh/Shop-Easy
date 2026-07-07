import "./Categories.css";
import CategoryCard from "./CategoryCard";

import electronics from "../../assets/images/electronics.png";
import fashion from "../../assets/images/fashion.png";
import shoes from "../../assets/images/shoes.png";
import watches from "../../assets/images/watches.png";
import furniture from "../../assets/images/furniture.png";
import beauty from "../../assets/images/beauty.png";
import { getAllCategories } from "../../services/CategoryService";
function Categories() {

    const categories = [

        {
            id:1,
            name:"Electronics",
            image:electronics
        }
        ,

        {
            id:2,
            name:"Fashion",
            image:fashion
        },

        {
            id:3,
            name:"Shoes",
            image:shoes
        },

        {
            id:4,
            name:"Watches",
            image:watches
        },

        {
            id:5,
            name:"Furniture",
            image:furniture
        },

        {
            id:6,
            name:"Beauty",
            image:beauty
        }

    ];

    return (

        <section className="categories-section">

            <div className="container">

                <h2 className="section-title">

                    Shop by Categories

                </h2>

                <div className="row">

                    {
                        categories.map(category => (

                            <CategoryCard
                                key={category.id}
                                category={category}
                            />

                        ))
                    }

                </div>

            </div>

        </section>

    );

}

export default Categories;