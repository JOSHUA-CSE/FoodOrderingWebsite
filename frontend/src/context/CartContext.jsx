import React, { createContext, useState, useCallback } from 'react';
import { cartAPI } from '../api/axios';

export const CartContext = createContext();

export const CartProvider = function({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend
  const fetchCart = useCallback(function() {
    return new Promise(function(resolve, reject) {
      setLoading(true);
      cartAPI.getCart().then(function(response) {
        let items = response.data.cart && response.data.cart.items ? response.data.cart.items : response.data.items || [];
        setCartItems(items);
        setLoading(false);
        resolve(response.data);
      }).catch(function(error) {
        console.log('Error fetching cart:', error);
        setCartItems([]);
        setLoading(false);
        resolve({ items: [] });
      });
    });
  }, []);

  // Add item to cart
  const addToCart = function(itemId, quantity) {
    if (quantity === undefined) {
      quantity = 1;
    }
    return new Promise(function(resolve, reject) {
      cartAPI.addToCart({ itemId: itemId, quantity: quantity }).then(function(response) {
        // Re-fetch to get populated data
        fetchCart();
        resolve(response.data);
      }).catch(function(error) {
        console.log('Error adding to cart:', error);
        reject(error);
      });
    });
  };

  // Update cart item quantity
  const updateCartItem = function(itemId, quantity) {
    return new Promise(function(resolve, reject) {
      cartAPI.updateCart(itemId, quantity).then(function(response) {
        let items = response.data.cart && response.data.cart.items ? response.data.cart.items : response.data.items || [];
        setCartItems(items);
        // Re-fetch to get populated data
        fetchCart();
        resolve(response.data);
      }).catch(function(error) {
        console.log('Error updating cart:', error);
        reject(error);
      });
    });
  };

  // Remove item from cart
  const removeFromCart = function(itemId) {
    return new Promise(function(resolve, reject) {
      cartAPI.removeFromCart(itemId).then(function(response) {
        let items = response.data.cart && response.data.cart.items ? response.data.cart.items : response.data.items || [];
        setCartItems(items);
        resolve(response.data);
      }).catch(function(error) {
        console.log('Error removing from cart:', error);
        reject(error);
      });
    });
  };

  // Clear all items from cart
  const clearCart = function() {
    setCartItems([]);
  };

  // Calculate total price
  const getTotalPrice = function() {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      let cartItem = cartItems[i];
      let itemData = cartItem.item || cartItem;
      let price = itemData.price || 0;
      let quantity = cartItem.quantity || 1;
      total = total + (price * quantity);
    }
    return total;
  };

  // Calculate total items
  const getTotalItems = function() {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      let quantity = item.quantity || 1;
      total = total + quantity;
    }
    return total;
  };

  let value = {
    cartItems: cartItems,
    loading: loading,
    fetchCart: fetchCart,
    addToCart: addToCart,
    updateCartItem: updateCartItem,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    getTotalPrice: getTotalPrice,
    getTotalItems: getTotalItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = function() {
  let context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
