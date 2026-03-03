import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderAPI, adminAPI } from '../api/axios';


const AdminDashboard = function() {
  let [orders, setOrders] = useState([]);
  let [stats, setStats] = useState(null);
  let [loading, setLoading] = useState(true);
  let [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(function() {
    fetchDashboardData();
  }, []);

  let fetchDashboardData = function() {
    Promise.all([
      orderAPI.getAllOrders(),
      adminAPI.getStats()
    ]).then(function(results) {
      setOrders(results[0].data);
      setStats(results[1].data);
      setLoading(false);
    }).catch(function(error) {
      toast.error('Failed to load dashboard data');
      setLoading(false);
    });
  };

  let handleStatusUpdate = function(orderId, newStatus) {
    orderAPI.updateOrderStatus(orderId, newStatus).then(function() {
      let updatedOrders = orders.map(function(order) {
        if (order._id === orderId) {
          order.status = newStatus;
        }
        return order;
      });
      setOrders(updatedOrders);
      toast.success('Order status updated');
    }).catch(function(error) {
      toast.error('Failed to update order status');
    });
  };

  if (loading) {
    return (
      <div className='min-h-[calc(100vh-300px)] px-5 py-10 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-5'>
          <p className='text-lg text-slate-700'>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[calc(100vh-300px)] py-10 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-5'>
        <h1 className='text-center text-4xl font-bold mb-10 text-slate-700'>Admin Dashboard</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10'>
          <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all'>
            <div className='text-4xl mb-4'>📦</div>
            <div>
              <p className='text-gray-600 text-xs uppercase font-bold'>Total Orders</p>
              <p className='text-2xl font-bold text-orange-500'>{stats && stats.totalOrders ? stats.totalOrders : 0}</p>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all'>
            <div className='text-4xl mb-4'>💰</div>
            <div>
              <p className='text-gray-600 text-xs uppercase font-bold'>Total Revenue</p>
              <p className='text-2xl font-bold text-orange-500'>₹{stats && stats.totalRevenue ? stats.totalRevenue.toFixed(2) : '0'}</p>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all'>
            <div className='text-4xl mb-4'>🍕</div>
            <div>
              <p className='text-gray-600 text-xs uppercase font-bold'>Menu Items</p>
              <p className='text-2xl font-bold text-orange-500'>{stats && stats.totalItems ? stats.totalItems : 0}</p>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all'>
            <div className='text-4xl mb-4'>👥</div>
            <div>
              <p className='text-gray-600 text-xs uppercase font-bold'>Total Users</p>
              <p className='text-2xl font-bold text-orange-500'>{stats && stats.totalUsers ? stats.totalUsers : 0}</p>
            </div>
          </div>
        </div>
        <div className='flex gap-4 mb-10 flex-wrap'>
          <Link to='/admin/add-item' className='min-w-48 px-6 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition'>➕ Add New Item</Link>
          <Link to='/admin/items' className='min-w-48 px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition'>📝 Manage Items</Link>
        </div>
        <section className='bg-white p-6 rounded-lg shadow-md overflow-x-auto'>
          <h2 className='text-2xl font-bold mb-5 text-slate-700'>Recent Orders</h2>
          {orders.length === 0 ? (
            <p className='text-gray-600'>No orders found</p>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse text-sm'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='px-4 py-3 text-left font-bold text-slate-700 border-b-2 border-gray-300'>Order ID</th>
                    <th className='px-4 py-3 text-left font-bold text-slate-700 border-b-2 border-gray-300'>User</th>
                    <th className='px-4 py-3 text-left font-bold text-slate-700 border-b-2 border-gray-300'>Amount</th>
                    <th className='px-4 py-3 text-left font-bold text-slate-700 border-b-2 border-gray-300'>Status</th>
                    <th className='px-4 py-3 text-left font-bold text-slate-700 border-b-2 border-gray-300'>Date</th>
                    <th className='px-4 py-3 text-left font-bold text-slate-700 border-b-2 border-gray-300'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map(function(order) {
                    let userName = order.userId && order.userId.name ? order.userId.name : 'N/A';
                    let orderDate = new Date(order.createdAt).toLocaleDateString();
                    return (
                      <tr key={order._id} className='hover:bg-gray-50 border-b border-gray-200'>
                        <td className='px-4 py-3 text-gray-600'>{order._id.slice(-8)}</td>
                        <td className='px-4 py-3 text-gray-600'>{userName}</td>
                        <td className='px-4 py-3 text-gray-600'>₹{order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</td>
                        <td className='px-4 py-3 text-gray-600'>
                          <select
                            value={order.status}
                            onChange={function(e) { handleStatusUpdate(order._id, e.target.value); }}
                            className='px-3 py-1 border border-gray-300 rounded-lg text-sm cursor-pointer focus:outline-none focus:border-orange-500'
                          >
                            <option value='pending'>Pending</option>
                            <option value='confirmed'>Confirmed</option>
                            <option value='out_for_delivery'>Out for Delivery</option>
                            <option value='delivered'>Delivered</option>
                            <option value='cancelled'>Cancelled</option>
                          </select>
                        </td>
                        <td className='px-4 py-3 text-gray-600'>{orderDate}</td>
                        <td className='px-4 py-3'>
                          <button
                            onClick={function() { setExpandedOrderId(expandedOrderId === order._id ? null : order._id); }}
                            className='px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition'
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
