import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                    <h2 className="text-xl font-bold mb-4">E-Shop</h2>
                    <p className="text-gray-400">Your one-stop shop for all your needs. Quality products at the best prices.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                        <li><Link to="/shop" className="text-gray-400 hover:text-white">Shop</Link></li>
                        <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                        <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                        <li><Link to="/shipping" className="text-gray-400 hover:text-white">Shipping & Returns</Link></li>
                        <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faLinkedin} size="lg" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4">
                <p>© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
            </div>
        </footer>
    );
}
