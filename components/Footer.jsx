// components/Footer.js

import React from 'react';
import '@styles/Footer.scss'; // Import the SCSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__row">
          <div className="footer__column">
            <h4>About Us</h4>
            <p>Art Bazaar is a platform showcasing unique artworks from various artists. We connect artists with art lovers worldwide.</p>
          </div>
          <div className="footer__column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer__column">
            <h4>Follow Us</h4>
            <div className="footer__social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/facebook.svg" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/instagram.svg" alt="Instagram" />
              </a>
              <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/x.svg" alt="Twitter" />
              </a>
              <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/pintrest.svg" alt="Pinterest" />
              </a>
            </div>
          </div>
          <div className="footer__column">
            <h4>Contact Us</h4>
            <p>Email: support@artbazaar.com</p>
            <p>Phone: +91 (234) 567-890</p>
          </div>
        </div>
        <div className="created">
            <span>Created by ❤️ Mahak Pandey</span>
        </div>
        <div className="footer__bottom-row">
          <p>&copy; {new Date().getFullYear()} Art Bazaar. All rights reserved.</p>
          <div className="footer__legal-links">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
