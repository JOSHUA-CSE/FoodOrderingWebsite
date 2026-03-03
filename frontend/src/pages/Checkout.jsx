import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderAPI } from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = function() {
  let navigate = useNavigate();
  let cartData = useCart();
  let cartItems = cartData.cartItems;
  let getTotalPrice = cartData.getTotalPrice;
  let clearCart = cartData.clearCart;
  
  let authData = useAuth();
  let user = authData.user;
  
  let [loading, setLoading] = useState(false);
  let [paymentMethod, setPaymentMethod] = useState('COD');
  let userPhone = user && user.phone ? user.phone : '';
  let [formData, setFormData] = useState({
    address: '',
    city: '',
    pincode: '',
    phone: userPhone
  });

  let handleInputChange = function(e) {
    let name = e.target.name;
    let value = e.target.value;
    setFormData(function(prev) {
      let newData = {};
      newData[name] = value;
      return Object.assign({}, prev, newData);
    });
  };

  let handlePlaceOrder = function(e) {
    e.preventDefault();
    setLoading(true);

    let orderData = {
      paymentMethod: paymentMethod
    };

    orderAPI.placeOrder(orderData).then(function(response) {
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    }).catch(function(error) {
      let message = (error.response && error.response.data && error.response.data.error) || 
                    (error.response && error.response.data && error.response.data.message) || 
                    'Failed to place order';
      toast.error(message);
    }).finally(function() {
      setLoading(false);
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className='min-h-[calc(100vh-300px)] px-5 py-10 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-5'>
          <div className='text-center py-20'>
            <h2 className='text-2xl font-bold text-slate-700 mb-3'>Your cart is empty</h2>
            <p className='text-gray-600 mb-8'>Please add items before proceeding to checkout.</p>
            <button onClick={function() { navigate('/menu'); }} className='px-8 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition'>Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  let subtotal = getTotalPrice();
  let tax = subtotal * 0.05;
  let delivery = 50;
  let total = subtotal + tax + delivery;

  return (
    <div className='min-h-[calc(100vh-300px)] py-10 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-5'>
        <h1 className='text-4xl font-bold text-slate-700 mb-10'>Checkout</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <form onSubmit={handlePlaceOrder}>
              <section className='bg-white p-8 rounded-lg shadow-md mb-8'>
                <h2 className='text-2xl font-bold text-slate-700 mb-6'>Delivery Address</h2>
                <div className='mb-6'>
                  <label htmlFor='address' className='block text-sm font-bold text-slate-700 mb-2'>Street Address:</label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder='Enter your street address'
                    className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                  <div>
                    <label htmlFor='city' className='block text-sm font-bold text-slate-700 mb-2'>City:</label>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder='Enter your city'
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
                    />
                  </div>
                  <div>
                    <label htmlFor='pincode' className='block text-sm font-bold text-slate-700 mb-2'>Pincode:</label>
                    <input
                      type='text'
                      id='pincode'
                      name='pincode'
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      placeholder='Enter pincode'
                      className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor='phone' className='block text-sm font-bold text-slate-700 mb-2'>Phone:</label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder='Enter phone number'
                    className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
                  />
                </div>
              </section>
              <section className='bg-white p-8 rounded-lg shadow-md mb-8'>
                <h2 className='text-2xl font-bold text-slate-700 mb-6'>Payment Method</h2>
                <div className='space-y-4'>
                  <label className='flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition'>
                    <input
                      type='radio'
                      value='COD'
                      checked={paymentMethod === 'COD'}
                      onChange={function(e) { setPaymentMethod(e.target.value); }}
                      className='w-5 h-5 accent-orange-500'
                    />
                    <span className='ml-3 font-semibold text-slate-700'>Cash on Delivery</span>
                  </label>
                  <label className='flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition'>
                    <input
                      type='radio'
                      value='ONLINE'
                      checked={paymentMethod === 'ONLINE'}
                      onChange={function(e) { setPaymentMethod(e.target.value); }}
                      className='w-5 h-5 accent-orange-500'
                    />
                    <span className='ml-3 font-semibold text-slate-700'>Online Payment</span>
                  </label>
                </div>
                {paymentMethod === 'ONLINE' && (
                  <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                    <p className='text-blue-700'>💳 Mock payment gateway - use any test card details</p>
                  </div>
                )}
              </section>
              <button
                type='submit'
                className='w-full px-8 py-4 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg'
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
          <div className='lg:col-span-1'>
            <div className='bg-white p-8 rounded-lg shadow-md sticky top-20'>
              <h2 className='text-2xl font-bold text-slate-700 mb-6'>Order Summary</h2>
              <div className='mb-6 pb-6 border-b border-gray-200'>
                <h3 className='font-bold text-slate-700 mb-4'>Items ({cartItems.length})</h3>
                {cartItems.map(function(cartItem) {
                  let itemData = cartItem.item || cartItem;
                  let itemName = itemData.name || 'Unknown Item';
                  let itemPrice = itemData.price || 0;
                  let quantity = cartItem.quantity || 1;
                  return (
                    <div key={cartItem._id} className='flex justify-between text-slate-700 mb-2'>
                      <span>{itemName} x {quantity}</span>
                      <span className='font-semibold'>₹{(itemPrice * quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <div className='space-y-3 mb-6 pb-6 border-b border-gray-200'>
                <div className='flex justify-between text-slate-700'>
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-slate-700'>
                  <span>Delivery:</span>
                  <span>₹{delivery.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-slate-700'>
                  <span>Tax (5%):</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              </div>
              <div className='flex justify-between text-xl font-bold text-slate-700'>
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
