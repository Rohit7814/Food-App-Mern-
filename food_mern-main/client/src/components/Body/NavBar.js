import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaSignature } from "react-icons/fa6";
import 'animate.css';

const Navbar = ({ count, toggleCart }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('isLoggedIn');
    
    navigate('/', { replace: true });
  };

  return (
    <nav className="flex-no-wrap fixed top-0 z-10 flex w-full items-center justify-between bg-gray-800 py-2 lg:flex-wrap lg:justify-start lg:py-4">
      
      <div className='flex items-center space-x-2 ml-6'>
          <p className='flex items-center text-lg font-semibold text-red-500 animate__animated animate__flash animate__infinite'>
            Rohit <FaSignature className='ml-1 text-red-500' size={22} />
          </p>
        </div>
      
      <div className="container mx-auto flex flex-row items-center justify-between lg:space-x-4">
        <h1 className="text-2xl font-semibold">Here is My Food App</h1>
        <div className="flex items-center">
          <div className="relative">
            <FaShoppingCart
              size={35}
              className='text-2xl cursor-pointer hover:text-red-700'
              onClick={toggleCart}
            />
            {count > 0 && (
              <div className="absolute -top-2 right-0 left-5 bg-red-500 text-white rounded-full h-5 w-6 flex items-center justify-center text-xs">
                {count}
              </div>
            )}
          </div>
          <button
            className="ml-4 text-white cursor-pointer hover:text-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
