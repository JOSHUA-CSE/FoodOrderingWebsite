import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { menuAPI, adminAPI } from '../api/axios';

const AddEditItem = function() {
  let params = useParams();
  let id = params.id;
  let navigate = useNavigate();
  
  let [loading, setLoading] = useState(false);
  let [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    available: true
  });

  useEffect(function() {
    if (id) {
      fetchItem();
    }
  }, [id]);

  let fetchItem = function() {
    menuAPI.getItemById(id).then(function(response) {
      setFormData(response.data);
    }).catch(function(error) {
      toast.error('Failed to load item');
    });
  };

  let handleInputChange = function(e) {
    let name = e.target.name;
    let value = e.target.value;
    let type = e.target.type;
    let checked = e.target.checked;
    
    let newValue = type === 'checkbox' ? checked : value;
    
    setFormData(function(prev) {
      let newData = {};
      newData[name] = newValue;
      return Object.assign({}, prev, newData);
    });
  };

  let handleSubmit = function(e) {
    e.preventDefault();
    setLoading(true);

    let savePromise = null;
    if (id) {
      savePromise = adminAPI.editMenuItem(id, formData);
    } else {
      savePromise = adminAPI.addMenuItem(formData);
    }

    savePromise.then(function() {
      toast.success(id ? 'Item updated successfully' : 'Item added successfully');
      navigate('/admin/items');
    }).catch(function(error) {
      let message = error.response?.data?.message || 'Failed to save item';
      toast.error(message);
    }).finally(function() {
      setLoading(false);
    });
  };

  let categories = ['Burgers', 'Pizzas', 'Noodles', 'Salads', 'Desserts', 'Beverages'];

  return (
    /* Main container with consistent padding */
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 max-w-[800px]'>
        {/* Page title - consistent spacing */}
        <h1 className='text-3xl font-bold text-slate-800 mb-8'>
          {id ? 'Edit Item' : 'Add New Item'}
        </h1>
        
        {/* Form card with shadow and rounded corners */}
        <form onSubmit={handleSubmit} className='bg-white rounded-xl shadow-sm p-8'>
          {/* Form fields with consistent spacing (gap-6) */}
          <div className='space-y-6'>
            {/* Item Name Field */}
            <div>
              <label htmlFor='name' className='block text-sm font-semibold text-slate-700 mb-2'>
                Item Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder='Enter item name'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all'
              />
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor='description' className='block text-sm font-semibold text-slate-700 mb-2'>
                Description
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                rows='4'
                placeholder='Enter item description'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none'
              />
            </div>

            {/* Price and Category - Grid layout for equal width */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label htmlFor='price' className='block text-sm font-semibold text-slate-700 mb-2'>
                  Price (₹)
                </label>
                <input
                  type='number'
                  id='price'
                  name='price'
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step='0.01'
                  min='0'
                  placeholder='0.00'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all'
                />
              </div>

              <div>
                <label htmlFor='category' className='block text-sm font-semibold text-slate-700 mb-2'>
                  Category
                </label>
                <select
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white'
                >
                  <option value=''>Select category</option>
                  {categories.map(function(cat) {
                    return <option key={cat} value={cat}>{cat}</option>;
                  })}
                </select>
              </div>
            </div>

            {/* Checkbox - properly aligned */}
            <div className='flex items-center gap-3 pt-2'>
              <input
                type='checkbox'
                id='available'
                name='available'
                checked={formData.available}
                onChange={handleInputChange}
                className='w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer'
              />
              <label htmlFor='available' className='text-sm font-medium text-slate-700 cursor-pointer'>
                Available for order
              </label>
            </div>
          </div>

          {/* Action buttons - consistent sizing with gap */}
          <div className='flex items-center gap-4 mt-8 pt-6 border-t border-gray-200'>
            <button 
              type='submit' 
              disabled={loading}
              className='px-6 py-3 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Saving...' : (id ? 'Update Item' : 'Add Item')}
            </button>
            <button
              type='button'
              onClick={function() { navigate('/admin/items'); }}
              className='px-6 py-3 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditItem;
