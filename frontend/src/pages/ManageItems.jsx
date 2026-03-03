import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { menuAPI, adminAPI } from '../api/axios';

const ManageItems = function() {
  let [items, setItems] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(function() {
    fetchItems();
  }, []);

  let fetchItems = function() {
    menuAPI.getAllItems().then(function(response) {
      setItems(response.data);
      setLoading(false);
    }).catch(function(error) {
      toast.error('Failed to load items');
      setLoading(false);
    });
  };

  let handleDelete = function(itemId) {
    let confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      adminAPI.deleteMenuItem(itemId).then(function() {
        let updatedItems = items.filter(function(item) {
          return item._id !== itemId;
        });
        setItems(updatedItems);
        toast.success('Item deleted successfully');
      }).catch(function(error) {
        toast.error('Failed to delete item');
      });
    }
  };

  if (loading) {
    return (
      <div className='min-h-[calc(100vh-300px)] px-5 py-10 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-5'>
          <p className='text-lg text-slate-700'>Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[calc(100vh-300px)] py-10 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-5'>
        <div className='flex justify-between items-center mb-8 flex-wrap gap-5'>
          <h1 className='text-4xl font-bold text-slate-700'>Manage Items</h1>
          <Link to='/admin/add-item' className='px-6 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition'>➕ Add New Item</Link>
        </div>
        {items.length === 0 ? (
          <p className='text-gray-600'>No items found</p>
        ) : (
          <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='px-4 py-4 text-left font-bold text-slate-700 border-b-2 border-gray-300'>Name</th>
                  <th className='px-4 py-4 text-left font-bold text-slate-700 border-b-2 border-gray-300'>Category</th>
                  <th className='px-4 py-4 text-left font-bold text-slate-700 border-b-2 border-gray-300'>Price</th>
                  <th className='px-4 py-4 text-left font-bold text-slate-700 border-b-2 border-gray-300'>Status</th>
                  <th className='px-4 py-4 text-left font-bold text-slate-700 border-b-2 border-gray-300'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(function(item) {
                  let statusClass = item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
                  let statusText = item.available ? '✓ Available' : '✗ Unavailable';
                  return (
                    <tr key={item._id} className='hover:bg-gray-50 border-b border-gray-200'>
                      <td className='px-4 py-3 text-gray-600'>{item.name}</td>
                      <td className='px-4 py-3 text-gray-600'>{item.category}</td>
                      <td className='px-4 py-3 text-gray-600'>₹{item.price}</td>
                      <td className='px-4 py-3'>
                        <span className={'inline-block px-3 py-1 rounded-lg text-xs font-bold ' + statusClass}>{statusText}</span>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex gap-2'>
                          <Link to={'/admin/edit-item/' + item._id} className='px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition'>✎ Edit</Link>
                          <button
                            onClick={function() { handleDelete(item._id); }}
                            className='px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition'
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageItems;
