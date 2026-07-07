import "./OfferBanner.css";
import offerImage from "../../assets/images/offer-banner.png";

function OfferBanner() {
  return (
    <section className="offer-section">
      <div className="container">

        <div className="offer-card">

          <div className="row align-items-center">

            {/* Left Content */}
            <div className="col-lg-7">

              <span className="offer-tag">
                🔥 LIMITED TIME OFFER
              </span>

              <h2 className="offer-title">
                Mega Sale Up To
                <span> 70% OFF</span>
              </h2>

              <p className="offer-description">
                Upgrade your lifestyle with amazing discounts on
                Electronics, Fashion, Shoes, Furniture, Beauty
                and much more.
              </p>

              <button className="btn btn-light offer-btn">
                Shop Now
              </button>

            </div>

            {/* Right Image */}

            <div className="col-lg-5 text-center">

              <img
                src={offerImage}
                alt="Offer Banner"
                className="offer-image"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default OfferBanner;