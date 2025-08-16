import { Link } from "react-router";
import logo from "../../assets/images/building.png";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 py-6 container mx-auto">
      <div className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row md:justify-between gap-10">
        {/* Logo & Description */}
        <div className="flex-1">
          <Link
            to="/"
            className="flex items-center text-xl font-extrabold"
          >
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-800 to-green-500">
              PropEase
            </span>
          </Link>
          <p className="text-sm mt-2">Your trusted real estate partner.</p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="footer-title">Quick Links</h3>
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="font-semibold text-gray-700 hover:underline hover:decoration-green-500 hover:underline-offset-4  [&.active]:text-green-500"
            >
              Home
            </Link>
            <Link
              to="/all-properties"
              className="font-semibold text-gray-700 hover:underline hover:decoration-green-500 hover:underline-offset-4  [&.active]:text-green-500"
            >
              All Properties
            </Link>
            <Link
              to="/dashboard"
              className="font-semibold text-gray-700 hover:underline hover:decoration-green-500 hover:underline-offset-4  [&.active]:text-green-500"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex-1">
          <h3 className="footer-title">Contact</h3>
          <p>Email: support@propease.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Dhaka, Bangladesh</p>
        </div>

        {/* Social Icons */}
        <div className="flex-1">
          <h3 className="footer-title">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 bg-base-300 text-sm">
        © {new Date().getFullYear()} PropEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
