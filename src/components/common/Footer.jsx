import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#10172a] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-4">
              Instrubay
            </h2>
            <p className="text-sm leading-relaxed">
              Your trusted marketplace for premium musical instruments,
              studio gear, and accessories.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Shop
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Guitars</a></li>
              <li><a href="#" className="hover:text-white">Keyboards</a></li>
              <li><a href="#" className="hover:text-white">Drums</a></li>
              <li><a href="#" className="hover:text-white">Accessories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@instrubay.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Mon – Sat: 10AM – 8PM</li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white">🌐</a>
              <a href="#" className="hover:text-white">📘</a>
              <a href="#" className="hover:text-white">📸</a>
              <a href="#" className="hover:text-white">🐦</a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Instrumart. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
