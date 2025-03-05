
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-display font-bold text-gray-900 mb-4 animate-fade-in">404</h1>
        <div className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in">
          Page not found
        </div>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-full px-6 py-3 bg-black text-white font-medium transition-all hover:bg-opacity-90 animate-fade-in"
        >
          <ArrowLeft size={16} className="mr-2" /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
