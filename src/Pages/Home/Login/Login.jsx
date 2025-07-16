import React from 'react';
import Lottie from 'lottie-react';
import loginAnimation from "../../../assets/images/login.json"
import { Link } from 'react-router';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 p-6">
      
      {/* Left: Lottie Animation */}
      <div className="w-full md:w-1/2 max-w-lg">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>

      {/* Right: Login Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Login to Your Account</h2>
        
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>

    </div>
  );
};

export default Login;
