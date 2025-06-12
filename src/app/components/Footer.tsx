"use client";
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 px-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Filters */}
        <div>
          <div className="font-semibold mb-2 text-white">Filters</div>
          <div className="text-sm text-white">All<br />Electronics</div>
        </div>
        {/* About Us */}
        <div>
          <div className="font-semibold mb-2 text-white">About Us</div>
          <div className="text-sm text-white">About Us<br />Contact</div>
        </div>
        {/* Social */}
        <div>
          <div className="font-semibold mb-2 text-white">Follow Us</div>
          <div className="flex gap-4">
            <span className="bg-blue-800 rounded-full p-2 flex items-center justify-center">
              <Facebook size={20} className="text-white" />
            </span>
            <span className="bg-blue-800 rounded-full p-2 flex items-center justify-center">
              <Twitter size={20} className="text-white" />
            </span>
            <span className="bg-blue-800 rounded-full p-2 flex items-center justify-center">
              <Instagram size={20} className="text-white" />
            </span>
          </div>
        </div>
      </div>
      <div className="text-xs text-white text-center mt-6">© 2024 American</div>
    </footer>
  );
};

export default Footer; 