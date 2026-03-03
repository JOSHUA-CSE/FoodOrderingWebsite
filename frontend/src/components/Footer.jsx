import React from 'react';

const Footer = function() {
  let today = new Date();
  let currentYear = today.getFullYear();

  return (
    /* Footer with consistent spacing and grid layout */
    <footer className='bg-slate-800 text-white mt-16'>
      <div className='container mx-auto px-4 max-w-[1200px] py-12'>
        {/* Grid: 3 equal columns on desktop, stack on mobile */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          <div>
            <h4 className='text-lg font-semibold mb-4'>About Us</h4>
            <p className='text-gray-300 text-sm leading-relaxed'>
              Delicious food delivered to your doorstep. Order now and enjoy!
            </p>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <a href='/' className='text-gray-300 text-sm hover:text-orange-400 transition-colors'>Home</a>
              </li>
              <li>
                <a href='/menu' className='text-gray-300 text-sm hover:text-orange-400 transition-colors'>Menu</a>
              </li>
              <li>
                <a href='/orders' className='text-gray-300 text-sm hover:text-orange-400 transition-colors'>Orders</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-4'>Contact</h4>
            <p className='text-gray-300 text-sm mb-2'>Email: info@foodordering.com</p>
            <p className='text-gray-300 text-sm'>Phone: 94875621565</p>
          </div>
        </div>
        {/* Copyright - centered with border top */}
        <div className='border-t border-gray-700 pt-6'>
          <p className='text-center text-gray-400 text-sm'>
            © {currentYear} Food Ordering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
