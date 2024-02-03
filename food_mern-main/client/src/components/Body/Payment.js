// PaymentComponent.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentComponent = ({ totalBill, thankYou }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePaymentSuccess = (paymentResponse) => {
      console.log(paymentResponse);
      setPaymentSuccess(true);
      // Additional logic for successful payment
      thankYou(); // Call thankYou function from the parent component
      navigate('/final'); // Navigate to the next page
    };

    // Convert totalBill to paise (smallest unit of currency)
    const totalBillInPaise = Math.round(totalBill * 100);

    const options = {
      key: 'rzp_test_8IRBTUQQEjgjjQ',
      amount: totalBillInPaise,
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Payment for Your Product/Service',
      handler: handlePaymentSuccess,
    };

    const rzp = new window.Razorpay(options);
    window.rzp = rzp;

    return () => {
      rzp.close();
    };
  }, [totalBill, thankYou, navigate]);

  const handlePaymentButtonClick = () => {
    try {
      window.rzp.open();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mt-4 bg-gray-800 p-6 rounded-md shadow-md">
      {!paymentSuccess && (
        <>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 focus:outline-none focus:shadow-outline-blue"
            onClick={handlePaymentButtonClick}
          >
            Pay Now
          </button>
          <p className="text-sm mt-4 text-gray-300">
            We use Razorpay for secure online payments.
          </p>
        </>
      )}
      {paymentSuccess && (
        <p className="text-green-500 mt-4 text-xl font-semibold">
          Payment Successful!
        </p>
      )}
    </div>
  );
};

export default PaymentComponent;
