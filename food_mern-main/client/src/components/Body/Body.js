import React, { useState, useEffect } from 'react';
import data from '../../../src/data.json';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import PaymentComponent from './Payment';
import './cart.css';

const Body = () => {
  const [count, setCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [totalBill, setTotalBill] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login page
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const addToCart = (item) => {
    setCount(count + 1);
    const existingItem = selectedItems.find((selectedItem) => selectedItem.title === item.title);

    const price = parseFloat(item.price || 0);

    if (existingItem) {
      const updatedItems = selectedItems.map((selectedItem) =>
        selectedItem.title === item.title
          ? {
              ...selectedItem,
              count: selectedItem.count + 1,
              totalPrice: selectedItem.totalPrice + price,
            }
          : selectedItem
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { ...item, count: 1, totalPrice: price }]);
    }

    setTotalBill(totalBill + price);
  };

  const removeFromCart = (item) => {
    const existingItem = selectedItems.find((selectedItem) => selectedItem.title === item.title);

    const price = parseFloat(item.price || 0);

    if (existingItem) {
      if (count > 0) {
        setCount(count - 1);
      }

      if (existingItem.count > 1) {
        const updatedItems = selectedItems.map((selectedItem) =>
          selectedItem.title === item.title
            ? {
                ...selectedItem,
                count: selectedItem.count - 1,
                totalPrice: selectedItem.totalPrice - price,
              }
            : selectedItem
        );
        setSelectedItems(updatedItems);
      } else {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.title !== item.title));
      }

      setTotalBill(totalBill - price);
    }
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const thankYou = () => {
    setCartOpen(false);
    setCount(0);
    setTotalBill(0);
    setSelectedItems([]);
    window.alert('Order Successful');
    navigate('/final');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <Navbar count={count} toggleCart={toggleCart} />

      <div className="container mx-auto p-4 mt-16 mb-16">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <li key={index} className="mb-8">
              <div className="bg-gray-700 p-4 rounded-md shadow-md">
                <div className="flex flex-col space-y-2">
                  <h2 className="text-lg font-semibold">{item.title}</h2>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full object-cover rounded-md mb-4"
                  />

                  <span>{item.description}</span>
                  <span className="text-red-500 text-center">₹{item.price}</span>

                  <div className="flex flex-row items-center space-x-3 justify-center">
                    <button
                      className={`flex justify-center ${
                        count === 0
                          ? 'bg-red-300 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-700'
                      } text-white font-semibold py-2 px-7 rounded focus:outline-none focus:shadow-outline-red active:bg-red-800 transition-all duration-200`}
                      onClick={() => removeFromCart(item)}
                      disabled={count === 0}
                      style={{ cursor: count === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      -
                    </button>
                    <span>
                      {selectedItems.find((selectedItem) => selectedItem.title === item.title)
                        ?.count || 0}
                    </span>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-7 rounded focus:outline-none focus:shadow-outline-green active:bg-green-800 transition-all duration-200"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="fixed top-10 left-0 bottom-24 w-full h-full bg-black bg-opacity-50 flex items-center justify-center overflow-scroll">
            <div className="bg-gray-900 p-6 rounded-md text-white max-h-[80vh] overflow-y-auto scrollbar">
              <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>

              {selectedItems.length > 0 ? (
                <ul className="divide-y divide-gray-800">
                  {selectedItems.map((item, index) => (
                    <li key={index} className="py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-10 w-10 object-cover rounded"
                          />
                          <div>
                            <p className="text-sm font-semibold">{item.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-lg text-green-500 focus:outline-none"
                            onClick={() => addToCart(item)}
                          >
                            +
                          </button>
                          <button
                            className={`text-lg ${
                              item.count > 1 ? 'text-red-500' : 'text-gray-500'
                            } focus:outline-none`}
                            onClick={() => removeFromCart(item)}
                            disabled={item.count <= 1}
                          >
                            -
                          </button>
                          <p className="text-sm font-semibold">{item.count}</p>
                          <span className="text-lg">×</span>
                          <p className="text-sm font-semibold">₹{item.price}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No items in the cart.</p>
              )}

              <p className="mt-4 text-lg font-semibold">Total Bill: ₹{totalBill.toFixed(2)}</p>

              <div className="space-x-2 flex mt-4">
                <button
                  className="mt-4 bg-red-500 text-white py-2 px-5 rounded"
                  onClick={toggleCart}
                >
                  Close Cart
                </button>
                <PaymentComponent totalBill={totalBill} thankYou={thankYou} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
