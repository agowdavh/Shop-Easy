import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row">

          {/* Company */}

          <div className="col-lg-4 col-md-6 mb-4">

            <h2 className="footer-logo">
              ShopEasy
            </h2>

            <p className="footer-text">
              ShopEasy is your trusted online shopping destination
              offering electronics, fashion, beauty, furniture,
              groceries, and much more with secure payments and
              fast delivery.
            </p>

          </div>

          {/* Quick Links */}

          <div className="col-lg-2 col-md-6 mb-4">

            <h5>Quick Links</h5>

            <ul className="footer-links">

              <li><a href="/">Home</a></li>

              <li><a href="/">Products</a></li>

              <li><a href="/">Categories</a></li>

              <li><a href="/">About</a></li>

              <li><a href="/">Contact</a></li>

            </ul>

          </div>

          {/* Customer Service */}

          <div className="col-lg-3 col-md-6 mb-4">

            <h5>Customer Service</h5>

            <ul className="footer-links">

              <li><a href="/">FAQ</a></li>

              <li><a href="/">Shipping</a></li>

              <li><a href="/">Returns</a></li>

              <li><a href="/">Privacy Policy</a></li>

              <li><a href="/">Terms & Conditions</a></li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-3 col-md-6">

            <h5>Contact Us</h5>

            <p>
              <FaMapMarkerAlt /> Bangalore, Karnataka
            </p>

            <p>
              <FaPhoneAlt /> +91 9876543210
            </p>

            <p>
              <FaEnvelope /> support@shopeasy.com
            </p>

            <div className="social-icons">

              <a href="/">
                <FaFacebookF />
              </a>

              <a href="/">
                <FaInstagram />
              </a>

              <a href="/">
                <FaLinkedinIn />
              </a>

              <a href="/">
                <FaTwitter />
              </a>

            </div>

          </div>

        </div>

        <hr />

        <div className="copyright">

          © 2026 ShopEasy. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;