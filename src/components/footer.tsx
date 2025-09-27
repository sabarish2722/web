
import React from 'react';
import Link from 'next/link';
import VisitorCounter from './visitor-counter'; // Import the new component

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Quantum Asset</h3>
            <p className="text-gray-400">
              Innovating the future of asset management with cutting-edge technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {/* Social media links can be added here */}
            </div>
            <div className="mt-4">
              <VisitorCounter />
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8">
          <p>&copy; {new Date().getFullYear()} Quantum Asset. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
