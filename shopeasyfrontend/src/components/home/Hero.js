import "./Hero.css";
import heroImage from "../../assets/images/hero-shopping.png";

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Side */}
          <div className="col-lg-6 col-md-6">

            <span className="offer-badge">
              🔥 Summer Sale 50% OFF
            </span>

            <h1 className="hero-title mt-4">
              Discover the Latest Trends
              <br />
              at <span>ShopEasy</span>
            </h1>

            <p className="hero-description">
              Shop from thousands of products with the best prices,
              secure payments, and lightning-fast delivery.
            </p>

            <div className="hero-buttons">

              <button className="btn btn-primary btn-lg">
                Shop Now
              </button>

              <button className="btn btn-outline-dark btn-lg ms-3">
                Explore
              </button>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 col-md-6 text-center">

            <img
              src={heroImage}
              alt="Shopping"
              className="img-fluid hero-image"
            />

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;