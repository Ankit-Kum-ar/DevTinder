import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <header className="w-full py-6 bg-opacity-75 bg-black">
        <h1 className="text-4xl font-bold text-center">Welcome to DevTinder</h1>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
          Connect with Developers Around the World
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Join our community and start collaborating on exciting projects today!
        </p>
        <Link className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300" to="/signup">
          Get Started
        </Link>
      </main>
    </div>
  );
};

export default Home;
