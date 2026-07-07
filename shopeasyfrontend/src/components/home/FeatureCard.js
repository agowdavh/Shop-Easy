import "./WhyChooseUs.css";

function FeatureCard({ feature }) {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="feature-card">

        <div className="feature-icon">
          {feature.icon}
        </div>

        <h4>{feature.title}</h4>

        <p>{feature.description}</p>

      </div>
    </div>
  );
}

export default FeatureCard;