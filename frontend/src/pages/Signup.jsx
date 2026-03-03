import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Signup = function() {
  let [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  let [loading, setLoading] = useState(false);
  
  let authData = useAuth();
  let signup = authData.signup;
  
  let navigate = useNavigate();

  let handleChange = function(e) {
    let name = e.target.name;
    let value = e.target.value;
    setFormData(function(prev) {
      let newData = {};
      newData[name] = value;
      return Object.assign({}, prev, newData);
    });
  };

  let handleSubmit = function(e) {
    e.preventDefault();
    setLoading(true);

    signup(formData).then(function(response) {
      toast.success('Sign up successful!');
      navigate('/');
    }).catch(function(error) {
      let message = error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Sign up failed. Please try again.';
      toast.error(message);
    }).finally(function() {
      setLoading(false);
    });
  };

  return (
    <div className='min-h-[calc(100vh-300px)] flex items-center justify-center bg-gray-50 px-5 py-10'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-slate-700 mb-8 text-center'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label htmlFor='name' className='block text-sm font-bold text-slate-700 mb-2'>Full Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              placeholder='Enter your full name'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='email' className='block text-sm font-bold text-slate-700 mb-2'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              placeholder='Enter your email'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='phone' className='block text-sm font-bold text-slate-700 mb-2'>Phone:</label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Enter your phone number'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block text-sm font-bold text-slate-700 mb-2'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              placeholder='Enter your password'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500'
            />
          </div>
          <button type='submit' className='w-full px-6 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed' disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className='text-center text-slate-700 mt-6 text-sm'>
          Already have an account? <Link to='/login' className='text-orange-500 font-bold hover:text-orange-600'>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
