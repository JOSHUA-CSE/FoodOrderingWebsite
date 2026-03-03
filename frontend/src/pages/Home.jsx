import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = function() {
  let authData = useAuth();
  let isAuthenticated = authData.isAuthenticated;

  return (
    <div className='w-full'>
      <section className='bg-gradient-to-r from-orange-500 to-yellow-400 py-12 md:py-16 px-4 md:px-5'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center min-h-[300px] md:min-h-[400px]'>
            <div className='flex flex-col justify-center order-2 md:order-1'>
              <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight'>Welcome to Food Ordering</h1>
              <p className='text-sm md:text-base lg:text-lg text-white opacity-95 mb-5 md:mb-6'>Order your favorite meals from the comfort of your home</p>
              <div className='flex gap-2 md:gap-3 flex-wrap'>
                <Link to='/menu' className='px-5 md:px-6 py-2 md:py-3 bg-white text-orange-500 rounded-lg font-bold hover:bg-gray-100 transition text-xs md:text-sm lg:text-base'>Order Now</Link>
                {!isAuthenticated && <Link to='/signup' className='px-5 md:px-6 py-2 md:py-3 bg-orange-700 text-white rounded-lg font-bold hover:bg-orange-800 transition text-xs md:text-sm lg:text-base'>Create Account</Link>}
              </div>
            </div>
            <div className='flex justify-center md:justify-end order-1 md:order-2'>
              <div className='text-6xl md:text-7xl lg:text-8xl animate-bounce'>🍕</div>
            </div>
          </div>
        </div>
      </section>
      <section className='py-12 md:py-16 px-4 md:px-5 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-slate-700 mb-8 md:mb-10 text-center'>Popular Items</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10'>
            <div className='flex flex-col items-center text-center p-3 md:p-4 hover:shadow-lg rounded-lg transition'>
              <div className='text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-3'>🍔</div>
              <p className='text-sm md:text-base lg:text-lg font-semibold text-slate-700'>Burgers</p>
            </div>
            <div className='flex flex-col items-center text-center p-3 md:p-4 hover:shadow-lg rounded-lg transition'>
              <div className='text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-3'>🍕</div>
              <p className='text-sm md:text-base lg:text-lg font-semibold text-slate-700'>Pizzas</p>
            </div>
            <div className='flex flex-col items-center text-center p-3 md:p-4 hover:shadow-lg rounded-lg transition'>
              <div className='text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-3'>🍜</div>
              <p className='text-sm md:text-base lg:text-lg font-semibold text-slate-700'>Noodles</p>
            </div>
            <div className='flex flex-col items-center text-center p-3 md:p-4 hover:shadow-lg rounded-lg transition'>
              <div className='text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-3'>🥗</div>
              <p className='text-sm md:text-base lg:text-lg font-semibold text-slate-700'>Salads</p>
            </div>
          </div>
          <div className='text-center'>
            <Link to='/menu' className='px-6 md:px-8 py-2 md:py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition inline-block text-sm md:text-base lg:text-lg'>View Full Menu</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
