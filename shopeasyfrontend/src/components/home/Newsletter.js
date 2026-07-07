import "./Newsletter.css";
import { FaPaperPlane } from "react-icons/fa";

function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="container">

        <div className="newsletter-box">

          <h2>Stay Updated</h2>

          <p>
            Subscribe to our newsletter and get the latest products,
            exclusive offers, and exciting discounts delivered
            straight to your inbox.
          </p>

          <form className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email address"
            />

            <button type="submit">
              <FaPaperPlane />
              Subscribe
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;