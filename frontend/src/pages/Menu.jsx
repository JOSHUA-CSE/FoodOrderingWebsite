import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { menuAPI } from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Menu = function() {
  let [items, setItems] = useState([]);
  let [loading, setLoading] = useState(true);
  let [filter, setFilter] = useState('All');
  
  let cartData = useCart();
  let addToCart = cartData.addToCart;
  
  let authData = useAuth();
  let isAuthenticated = authData.isAuthenticated;

  useEffect(function() {
    fetchMenuItems();
  }, []);

  let fetchMenuItems = function() {
    menuAPI.getAllItems().then(function(response) {
      setItems(response.data);
      setLoading(false);
    }).catch(function(error) {
      toast.error('Failed to load menu items');
      setLoading(false);
    });
  };

  let handleAddToCart = function(item) {
  
    {if (!isAuthenticated) {
      toast.warning('Please login to add items to cart');
      return;
    }

    addToCart(item._id, 1).then(function() {
      toast.success(item.name + ' added to cart!');
    }).catch(function(error) {
      let message = error.response?.data?.message || 'Failed to add item to cart';
      toast.error(message);
    });
    }
  };

  let categories = ['All'];
  let categorySet = {};
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (item.category && !categorySet[item.category]) {
      categories.push(item.category);
      categorySet[item.category] = true;
    }
  }

  let filteredItems = filter === 'All' ? items : items.filter(item => item.category === filter);

  return (
  <div className="min-h-screen bg-gray-50">
  <div className="max-w-6xl mx-auto px-6 py-12">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
          Our Menu
        </h1>
        <p className="mt-3 text-slate-600 max-w-xl">
          Discover our delicious freshly prepared dishes made with love.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <p className="text-lg text-slate-600">Loading menu items...</p>
        </div>
      ) : (
        <>
          {/* Filter Section */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => {
                const isActive = filter === category;
                return (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-orange-500 text-white shadow-md scale-105"
                        : "bg-white border border-gray-300 text-slate-700 hover:border-orange-500 hover:text-orange-500"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <p className="text-lg text-slate-600">
                No items found in this category
              </p>
            </div>
          ) : (
            /* Grid Section */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Image */}
                  <div className="h-52 bg-gray-100 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-5xl">
                        🍽️
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-800">
                        {item.name}
                      </h3>
                      <p className="text-sm font-medium text-orange-500 mt-1">
                        {item.category}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 flex-grow leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <span className="text-2xl font-bold text-slate-800">
                        ₹{item.price}
                      </span>

                      {item.availability !== "Currently Available" ? (
                        <button
                          disabled
                          className="px-5 py-2 text-sm font-semibold rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="px-5 py-2 text-sm font-semibold rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  </div>
);
};
export default Menu;