import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({ email: '', name: '', password: '' });
  const [error, setError] = useState(null);
 

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(null); //initial state of error is null
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/register/register";
      await axios.post(url, data);
      window.location.href = '/';
    }catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-cover bg-center" style={{ backgroundImage: 'url("./food.jpg")' }}>
      <div className="absolute w-full h-full z-0 bg-black bg-opacity-0"></div>
      <div className="relative z-10 bg-black bg-opacity-75 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Register Here</h1>

        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-3 rounded hover:bg-gray-700 focus:outline-none transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
