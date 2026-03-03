import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import AddEditItem from './pages/AddEditItem';
import ManageItems from './pages/ManageItems';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main className='flex flex-col flex-1'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path='/admin/add-item' element={<AdminRoute><AddEditItem /></AdminRoute>} />
              <Route path='/admin/edit-item/:id' element={<AdminRoute><AddEditItem /></AdminRoute>} />
              <Route path='/admin/items' element={<AdminRoute><ManageItems /></AdminRoute>} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position='bottom-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
