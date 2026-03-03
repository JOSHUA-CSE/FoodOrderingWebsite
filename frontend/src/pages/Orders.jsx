import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { orderAPI } from '../api/axios';

const Orders = function() {
  let [orders, setOrders] = useState([]);
  let [loading, setLoading] = useState(true);
  let [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(function() {
    fetchUserOrders();
  }, []);

  let fetchUserOrders = function() {
    orderAPI.getUserOrders().then(function(response) {
      let orderList = response.data.orders || response.data || [];
      setOrders(orderList);
      setLoading(false);
    }).catch(function(error) {
      console.log('Error fetching orders:', error);
      toast.error('Failed to load orders');
      setLoading(false);
    });
  };

  let toggleOrderDetails = function(orderId) {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  let getStatusColor = function(status) {
    let colors = {
      pending: '#f39c12',
      confirmed: '#3498db',
      out_for_delivery: '#9b59b6',
      delivered: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  if (loading) {
    return (
      <div className='min-h-[calc(100vh-300px)] px-5 py-10 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-5'>
          <p className='text-lg text-slate-700'>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[calc(100vh-300px)] py-10 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-5'>
        <h1 className='text-4xl font-bold text-slate-700 mb-10'>My Orders</h1>
        {orders.length === 0 ? (
          <div className='text-center py-20'>
            <div className='text-6xl mb-5'>📦</div>
            <h2 className='text-2xl font-bold text-slate-700 mb-3'>No orders yet</h2>
            <p className='text-gray-600'>You haven't placed any orders yet. Start shopping now!</p>
          </div>
        ) : (
          <div className='space-y-5'>
            {orders.map(function(order) {
              let isExpanded = expandedOrderId === order._id;
              let orderDate = new Date(order.createdAt).toLocaleDateString();
              let statusText = order.status ? order.status.replace(/_/g, ' ').toUpperCase() : 'UNKNOWN';
              let totalAmount = order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A';

              let getStatusBgColor = function(status) {
                let statusColorMap = {
                  pending: 'bg-yellow-100',
                  confirmed: 'bg-blue-100',
                  out_for_delivery: 'bg-purple-100',
                  delivered: 'bg-green-100',
                  cancelled: 'bg-red-100'
                };
                return statusColorMap[status] || 'bg-gray-100';
              };

              let getStatusTextColor = function(status) {
                let statusColorMap = {
                  pending: 'text-yellow-700',
                  confirmed: 'text-blue-700',
                  out_for_delivery: 'text-purple-700',
                  delivered: 'text-green-700',
                  cancelled: 'text-red-700'
                };
                return statusColorMap[status] || 'text-gray-700';
              };

              return (
                <div key={order._id} className='bg-white rounded-lg shadow-md overflow-hidden'>
                  <div className='p-6 cursor-pointer hover:bg-gray-50 transition' onClick={function() { toggleOrderDetails(order._id); }}>
                    <div className='flex justify-between items-center'>
                      <div className='flex-1'>
                        <h3 className='text-lg font-bold text-slate-700 mb-1'>Order #{order._id.slice(-8)}</h3>
                        <p className='text-sm text-gray-600'>{orderDate}</p>
                      </div>
                      <div className='flex gap-6 items-center'>
                        <div className='text-right'>
                          <p className='text-sm text-gray-600'>Total:</p>
                          <p className='text-xl font-bold text-slate-700'>₹{totalAmount}</p>
                        </div>
                        <div className={getStatusBgColor(order.status) + ' ' + getStatusTextColor(order.status) + ' px-4 py-2 rounded-lg font-semibold text-sm'}>{statusText}</div>
                        <div className='text-slate-700 text-lg'>{isExpanded ? '▲' : '▼'}</div>
                      </div>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className='border-t border-gray-200 p-6 bg-gray-50'>
                      <div className='mb-6'>
                        <h4 className='text-lg font-bold text-slate-700 mb-4'>Items:</h4>
                        <div className='w-full overflow-x-auto'>
                          <table className='w-full text-sm'>
                            <thead>
                              <tr className='border-b border-gray-200'>
                                <th className='text-left py-2 px-4 font-bold text-slate-700'>Item</th>
                                <th className='text-left py-2 px-4 font-bold text-slate-700'>Price</th>
                                <th className='text-left py-2 px-4 font-bold text-slate-700'>Qty</th>
                                <th className='text-left py-2 px-4 font-bold text-slate-700'>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items && order.items.map(function(item) {
                                return (
                                  <tr key={item._id} className='border-b border-gray-200'>
                                    <td className='py-3 px-4 text-slate-700'>{item.name}</td>
                                    <td className='py-3 px-4 text-slate-700'>₹{item.price}</td>
                                    <td className='py-3 px-4 text-slate-700'>{item.quantity}</td>
                                    <td className='py-3 px-4 font-bold text-slate-700'>₹{(item.price * item.quantity).toFixed(2)}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                        <div className='bg-white p-5 rounded-lg'>
                          <h4 className='font-bold text-slate-700 mb-3'>Delivery Address:</h4>
                          <p className='text-slate-700'>{order.deliveryAddress ? order.deliveryAddress.address : 'N/A'}</p>
                          <p className='text-slate-700'>{order.deliveryAddress ? order.deliveryAddress.city + ', ' + order.deliveryAddress.pincode : 'N/A'}</p>
                          <p className='text-slate-700 mt-2'>Phone: {order.deliveryAddress ? order.deliveryAddress.phone : 'N/A'}</p>
                        </div>
                        <div className='bg-white p-5 rounded-lg'>
                          <h4 className='font-bold text-slate-700 mb-3'>Payment Information:</h4>
                          <p className='text-slate-700'>Method: {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online'}</p>
                          <p className='text-slate-700 mt-2'>Status: {order.paymentStatus ? order.paymentStatus.toUpperCase() : 'N/A'}</p>
                        </div>
                      </div>
                      <div className='bg-white p-5 rounded-lg'>
                        <div className='flex justify-between py-2 border-b border-gray-200'>
                          <span className='text-slate-700'>Subtotal:</span>
                          <span className='text-slate-700'>₹{(order.totalAmount * 0.95).toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between py-2 border-b border-gray-200'>
                          <span className='text-slate-700'>Delivery:</span>
                          <span className='text-slate-700'>₹50</span>
                        </div>
                        <div className='flex justify-between py-2 border-b border-gray-200'>
                          <span className='text-slate-700'>Tax:</span>
                          <span className='text-slate-700'>₹{(order.totalAmount * 0.05).toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between py-3 text-lg font-bold text-slate-700'>
                          <span>Total:</span>
                          <span>₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
