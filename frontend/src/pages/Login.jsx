import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = function() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [loading, setLoading] = useState(false);
  
  let authData = useAuth();
  let login = authData.login;
  
  let navigate = useNavigate();

  let handleSubmit = function(e) {
    e.preventDefault();
    setLoading(true);

    login(email, password).then(function(response) {
      toast.success('Login successful!');
      navigate('/');
    }).catch(function(error) {
      let message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    }).finally(function() {
      setLoading(false);
    });
  };

  return (
    /* Centered container with flexbox */
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4'>
      <div className='w-full max-w-md'>
        {/* Form card with consistent spacing */}
        <div className='bg-white rounded-xl shadow-sm p-8'>
          <h2 className='text-3xl font-bold text-slate-800 mb-8 text-center'>Login</h2>
          
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email field */}
            <div>
              <label htmlFor='email' className='block text-sm font-semibold text-slate-700 mb-2'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={function(e) { setEmail(e.target.value); }}
                required
                placeholder='Enter your email'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all'
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor='password' className='block text-sm font-semibold text-slate-700 mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={function(e) { setPassword(e.target.value); }}
                required
                placeholder='Enter your password'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all'
              />
            </div>

            {/* Submit button - full width */}
            <button 
              type='submit' 
              disabled={loading}
              className='w-full px-6 py-3 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Sign up link - centered */}
          <p className='text-center text-sm text-slate-600 mt-6'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-orange-500 font-semibold hover:text-orange-600 transition-colors'>
              Sign up here
            </Link>
          </p>

          {/* Demo credentials card */}
          <div className='mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg'>
            <p className='text-sm font-semibold text-slate-800 mb-2'>Demo Credentials:</p>
            <p className='text-xs text-slate-600 mb-1'>User: user@example.com / password123</p>
            <p className='text-xs text-slate-600'>Admin: admin@example.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
