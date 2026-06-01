import { FaYoutube, FaTwitter, FaPinterest, FaInstagram, FaFacebookF } from 'react-icons/fa'
import './footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>SUPPORT</h3>
            <ul>
              <li>Contact Us</li>
              <li>Shipping and Delivery</li>
              <li>Return Policy</li>
              <li>Gift Card Balance</li>
              <li>Service Discount</li>
              <li>Student Discount</li>
              <li>Transparency in Supply Chain</li>
              <li>Cookie Settings</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>&nbsp;</h3>
            <ul>
              <li>FAQ</li>
              <li>Store Locator</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Promotion Exclusions</li>
              <li>Do Not Sell or Share My Information</li>
              <li>Sitemap</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>ABOUT</h3>
            <ul>
              <li>Company</li>
              <li>Corporate News</li>
              <li>Press Center</li>
              <li>Investors</li>
              <li>Sustainability</li>
              <li>Careers</li>
              <li>NYC Flagship Store</li>
              <li>Las Vegas Flagship Store</li>
            </ul>
          </div>

          <div className="footer-column footer-column--small">
            <h3>STAY UP TO DATE</h3>
            <p>Sign Up for Email</p>
            <h3>EXPLORE</h3>
            <div className="footer-social">
              <button aria-label="YouTube">
                <FaYoutube />
              </button>
              <button aria-label="Twitter">
                <FaTwitter />
              </button>
              <button aria-label="Pinterest">
                <FaPinterest />
              </button>
              <button aria-label="Instagram">
                <FaInstagram />
              </button>
              <button aria-label="Facebook">
                <FaFacebookF />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bar">
          <button className="footer-country">🇺🇸 UNITED STATES</button>
          <div className="footer-legal">
            <span>© PUMA NORTH AMERICA, INC.</span>
            <div className="footer-legal-links">
              <a href="#">IMPRINT AND LEGAL DATA</a>
              <span>WEB ID: 285 260 105</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
