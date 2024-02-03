import React, { useState } from 'react';
import data from '../../../src/data.json';

import Navbar from './NavBar';

const Body = () => {
  const [count, setCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (item) => {
    setCount(count + 1);
    const existingItem = selectedItems.find((selectedItem) => selectedItem.title === item.title);

    if (existingItem) {
      const updatedItems = selectedItems.map((selectedItem) =>
        selectedItem.title === item.title ? { ...selectedItem, count: selectedItem.count + 1 } : selectedItem
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { ...item, count: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const existingItem = selectedItems.find((selectedItem) => selectedItem.title === item.title);

    if (existingItem) {
      if (count > 0) {
        setCount(count - 1);
      }

      if (existingItem.count > 1) {
        const updatedItems = selectedItems.map((selectedItem) =>
          selectedItem.title === item.title ? { ...selectedItem, count: selectedItem.count - 1 } : selectedItem
        );
        setSelectedItems(updatedItems);
      } else {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.title !== item.title));
      }
    }
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">

      {/* Navbar */}
      <Navbar count={count} toggleCart={toggleCart} />

      <div className="container mx-auto p-4 mt-16">
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

                  <div className="flex flex-row items-center space-x-3 justify-center">
                    <button
                      className="flex justify-center bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-7 rounded focus:outline-none focus:shadow-outline-red active:bg-red-800 transition-all duration-200"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                    <span>
                      {selectedItems.find((selectedItem) => selectedItem.title === item.title)?.count || 0}
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
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-black p-8 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
              {selectedItems.length > 0 ? (
                <ul>
                  {selectedItems.map((item, index) => (
                    <li key={index}>
                      {item.title} - {item.count}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items in the cart.</p>
              )}
              <button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                onClick={toggleCart}
              >
                Close Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
