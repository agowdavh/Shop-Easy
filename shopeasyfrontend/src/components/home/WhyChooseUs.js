import "./WhyChooseUs.css";
import FeatureCard from "./FeatureCard";

import {
  FaShippingFast,
  FaLock,
  FaUndoAlt,
  FaHeadset
} from "react-icons/fa";

function WhyChooseUs() {

  const features = [

    {
      id: 1,
      icon: <FaShippingFast />,
      title: "Free Delivery",
      description: "Free shipping on all orders above ₹999."
    },

    {
      id: 2,
      icon: <FaLock />,
      title: "Secure Payment",
      description: "100% secure payment with trusted gateways."
    },

    {
      id: 3,
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      description: "7-day hassle-free returns on eligible products."
    },

    {
      id: 4,
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Friendly customer support available anytime."
    }

  ];

  return (

    <section className="why-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="section-title">
            Why Choose ShopEasy
          </h2>

          <p className="section-subtitle">
            We provide the best shopping experience with fast delivery,
            secure payments, and excellent customer support.
          </p>

        </div>

        <div className="row">

          {
            features.map(feature => (

              <FeatureCard
                key={feature.id}
                feature={feature}
              />

            ))
          }

        </div>

      </div>

    </section>

  );
}

export default WhyChooseUs;