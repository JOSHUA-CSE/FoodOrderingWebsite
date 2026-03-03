import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = function() {
  let authData = useAuth();
  let user = authData.user;
  let logout = authData.logout;
  let isAuthenticated = authData.isAuthenticated;
  let isAdmin = authData.isAdmin;
  
  let cartData = useCart();
  let getTotalItems = cartData.getTotalItems;
  
  let navigate = useNavigate();

  let handleLogout = function() {
    logout();
    navigate('/');
  };

  return (
    /* Sticky header with shadow - max-width 1200px centered */
    <header className='sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100'>
      <div className='container mx-auto px-4 max-w-[1200px]'>
        {/* Flexbox: space-between for logo and nav, items-center for vertical alignment */}
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link to='/' className='text-xl font-bold text-orange-500 hover:text-orange-600 transition-colors'>
            🍽️ Food Ordering
          </Link>
          
          {/* Navigation - centered items with gap */}
          <nav className='hidden md:flex items-center gap-6'>
            <Link to='/' className='text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors'>Home</Link>
            <Link to='/menu' className='text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors'>Menu</Link>
            {isAuthenticated && (
              <>
                <Link to='/cart' className='text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors'>
                  Cart ({getTotalItems()})
                </Link>
                <Link to='/orders' className='text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors'>My Orders</Link>
                {isAdmin && (
                  <Link to='/admin' className='px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors'>
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>
          
          {/* Auth buttons - consistent sizing */}
          <div className='flex items-center gap-3'>
            {isAuthenticated ? (
              <>
                <span className='hidden lg:block text-sm font-medium text-slate-700'>Welcome, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className='px-4 py-2 bg-slate-600 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors'>
                  Login
                </Link>
                <Link to='/signup' className='px-4 py-2 bg-slate-600 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors'>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
