import React, { useEffect, useState } from 'react';
import './final.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
const Final = () => {
  const [animationClass, setAnimationClass] = useState('');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate=useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login page
      navigate('/');
    }
  }, [isLoggedIn,navigate]);



  useEffect(() => {
    // Function to toggle animation class
    const toggleAnimation = () => {
      setAnimationClass((prevClass) =>
        prevClass === 'animate__fadeInDown' ? 'animate__fadeOutUp' : 'animate__fadeInDown'
      );
    };

    // Toggle animation class at regular intervals
    const animationInterval = setInterval(toggleAnimation, 2000); // Adjust the interval as needed

    // Clean up the interval to avoid memory leaks
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className={`max-w-md p-8 bg-gray-800 rounded-md shadow-md ${animationClass}`}>
        <h1 className="text-3xl font-semibold mb-4">Thank You</h1>
        {/* Your content here */}
      </div>
    </div>
  );
};

export default Final;
