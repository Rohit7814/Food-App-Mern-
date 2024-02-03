import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in (you may use a token or other authentication status)
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      // User is already logged in, redirect to '/body'
      navigate('/body');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/login/login";
      const response = await axios.post(url, data);
  
      // Assuming a successful login, store authentication status and name
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', response.data.token);
  
      // Check if the response contains the user's name
      if (response.data && response.data.name) {
        localStorage.setItem('name', response.data.name);
        // console.log('Name stored in localStorage:', response.data.name);
      } else {
        console.error('Name not found in the response:', response.data);
      }
  
      // Redirect to '/body'
      navigate('/body');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials.');
      } else {
        console.error(error);
        setError('An error occurred while processing your request. Please try again later.');
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center">
      <div className="absolute w-full h-full z-0">
        <div className='absolute left-0 w-full h-full'>
          <img src="food.jpg" alt="img" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="relative z-10 bg-black bg-opacity-75 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Welcome to Food App</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-white block mb-2">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-white block mb-2">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-700 focus:outline-none transition duration-100"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center space-x-2">
          <p className="text-white text-xl">
            Not registered yet?
            <Link to="/register" className="text-gray-300 ml-1">
              <button className="text-red-600 text-xl hover:underline focus:outline-none transition duration-100">
                 Register
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
