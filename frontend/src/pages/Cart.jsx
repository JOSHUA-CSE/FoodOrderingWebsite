import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

const Cart = function() {
  let cartData = useCart();
  let cartItems = cartData.cartItems;
  let loading = cartData.loading;
  let fetchCart = cartData.fetchCart;
  let updateCartItem = cartData.updateCartItem;
  let removeFromCart = cartData.removeFromCart;
  let getTotalPrice = cartData.getTotalPrice;
  let getTotalItems = cartData.getTotalItems;

  useEffect(function() {
    fetchCart();
  }, [fetchCart]);

  let handleQuantityChange = function(itemId, newQuantity) {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    if (newQuantity > 10) {
      return;
    }
    updateCartItem(itemId, newQuantity).then(function() {
    }).catch(function(error) {
      toast.error('Failed to update cart');
    });
  };

  let handleRemoveItem = function(itemId) {
    removeFromCart(itemId).then(function() {
      toast.success('Item removed from cart');
    }).catch(function(error) {
      toast.error('Failed to remove item');
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <p className='text-lg text-slate-600'>Loading cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='container mx-auto px-4 max-w-[1200px]'>
          <h1 className='text-3xl font-bold text-slate-800 mb-8'>Shopping Cart</h1>
          <div className='flex flex-col items-center justify-center py-20 bg-white rounded-xl'>
            <div className='text-6xl mb-6'>🛒</div>
            <h2 className='text-2xl font-bold text-slate-800 mb-3'>Your cart is empty</h2>
            <p className='text-slate-600 mb-8'>Add some delicious items to get started!</p>
            <Link 
              to='/menu' 
              className='px-6 py-3 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 max-w-[1200px]'>
        <h1 className='text-3xl font-bold text-slate-800 mb-8'>Shopping Cart</h1>
        
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-4'>
            {cartItems.map(function(cartItem) {
              let itemData = cartItem.item || cartItem;
              let cartItemId = cartItem._id;
              let productId = itemData._id;
              let itemName = itemData.name || 'Unknown Item';
              let itemPrice = itemData.price || 0;
              let quantity = cartItem.quantity || 1;

              return (
                <div key={cartItemId} className='bg-white rounded-xl shadow-sm p-6'>
                  <div className='flex items-center gap-6'>
                    <div className='flex-grow'>
                      <h3 className='text-lg font-bold text-slate-800 mb-1'>{itemName}</h3>
                      <p className='text-sm text-slate-600'>₹{itemPrice} per item</p>
                    </div>
                    
                    <div className='flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg'>
                      <button
                        onClick={function() { handleQuantityChange(productId, quantity - 1); }}
                        className='w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-slate-700 font-semibold'
                      >
                        −
                      </button>
                      <span className='w-12 text-center font-semibold text-slate-800'>{quantity}</span>
                      <button
                        onClick={function() { handleQuantityChange(productId, quantity + 1); }}
                        disabled={quantity >= 10}
                        className='w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-slate-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        +
                      </button>
                    </div>
                    
                    <div className='w-24 text-right'>
                      <p className='text-lg font-bold text-slate-800'>₹{itemPrice * quantity}</p>
                    </div>
                    
                    <button
                      onClick={function() { handleRemoveItem(cartItemId); }}
                      className='w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                      aria-label='Remove item'
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-xl shadow-sm p-6 sticky top-24'>
              <h2 className='text-xl font-bold text-slate-800 mb-6'>Order Summary</h2>
              
              <div className='space-y-4 mb-6 pb-6 border-b border-gray-200'>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Total Items:</span>
                  <span className='font-semibold text-slate-800'>{getTotalItems()}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Subtotal:</span>
                  <span className='font-semibold text-slate-800'>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Delivery:</span>
                  <span className='font-semibold text-slate-800'>₹50</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Tax (5%):</span>
                  <span className='font-semibold text-slate-800'>₹{(getTotalPrice() * 0.05).toFixed(2)}</span>
                </div>
              </div>
              
              <div className='flex justify-between text-lg font-bold text-slate-800 mb-6'>
                <span>Total:</span>
                <span>₹{(getTotalPrice() + 50 + getTotalPrice() * 0.05).toFixed(2)}</span>
              </div>
              
              <div className='space-y-3'>
                <Link 
                  to='/checkout' 
                  className='block w-full px-6 py-3 bg-orange-500 text-white text-sm font-semibold text-center rounded-lg hover:bg-orange-600 transition-colors'
                >
                  Proceed to Checkout
                </Link>
                <Link 
                  to='/menu' 
                  className='block w-full px-6 py-3 bg-slate-100 text-slate-700 text-sm font-semibold text-center rounded-lg hover:bg-slate-200 transition-colors'
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
