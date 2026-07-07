function CategoryCard({ category }) {
    return (
        <div className="col-lg-2 col-md-4 col-sm-6 mb-4">

            <div className="category-card">

                <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                />

                <h5>{category.name}</h5>

            </div>

        </div>
    );
}

export default CategoryCard;