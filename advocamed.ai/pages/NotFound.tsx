import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO 
        title="Page Not Found"
        description="The page you are looking for does not exist. Return to AdvocaMed.ai to scan your medical bill."
        canonical="/404"
      />
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center bg-gray-50">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="mt-8 flex gap-4">
            <Link 
              to="/"
              className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primaryHover transition-colors shadow-lg"
            >
              Go Home
            </Link>
            <Link 
              to="/hospitals"
              className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition-colors"
            >
              Search Hospitals
            </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
