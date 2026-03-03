# Food Ordering Frontend

A modern React frontend for the Food Ordering MERN application with Vite, built with React Router, Context API, and Axios.

## Features

✅ **Authentication**
- User login and signup with JWT
- Protected routes
- Auto-logout on token expiry
- Admin role support

✅ **Public Features**
- Home page with featured items
- Menu page with category filtering
- Item details and availability status

✅ **User Features**
- Shopping cart with add/remove/update functionality
- Checkout with delivery address
- Payment method selection (COD & Mock Online)
- Order history tracking
- Order status monitoring

✅ **Admin Features**
- Dashboard with statistics
- Add/Edit/Delete menu items
- View all orders
- Update order status
- Revenue tracking

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router v6** - Routing
- **Axios** - API calls
- **Context API** - State management
- **React Toastify** - Notifications
- **CSS3** - Styling

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/              # API integration with axios
├── components/       # Reusable components (Header, Footer, Routes)
├── context/          # Context API providers (Auth, Cart)
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Login.jsx & Signup.jsx
│   ├── Menu.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Orders.jsx
│   ├── AdminDashboard.jsx
│   ├── ManageItems.jsx
│   └── AddEditItem.jsx
├── App.jsx          # Main app with routing
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Configuration

Update the API URL in `src/api/axios.js`:

```javascript
const API_URL = 'http://localhost:5000/api';
```

## Available Routes

### Public
- `/` - Home page
- `/login` - Login page
- `/signup` - Sign up page
- `/menu` - Menu with all items

### Protected (Requires Auth)
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/orders` - Order history

### Admin Only
- `/admin` - Admin dashboard
- `/admin/add-item` - Add new menu item
- `/admin/edit-item/:id` - Edit menu item
- `/admin/items` - Manage all items

## Default Credentials (for testing)

**User Account:**
- Email: user@example.com
- Password: password123

**Admin Account:**
- Email: admin@example.com
- Password: admin123

## Features Explained

### Authentication
- JWT tokens stored in localStorage
- Automatic token refresh on app load
- Token sent with every API request
- Auto-redirect to login on 401 response

### Cart Management
- Add items to cart (requires authentication)
- Update quantities
- Remove items
- Persistent cart data
- Real-time total calculation

### Order Placement
- Delivery address collection
- Payment method selection
- Order confirmation with toast notification
- Automatic cart clearance after successful order

### Admin Dashboard
- Real-time statistics (orders, revenue, items, users)
- Order status management dropdown
- Quick links to add/manage items
- Recent orders table with filtering

## Responsive Design

- Mobile-first approach
- Breakpoints at 480px, 768px, 1024px
- Touch-friendly buttons and inputs
- Optimized table layouts for mobile

## Error Handling

- Try-catch blocks on all API calls
- User-friendly error messages via toast
- Automatic logout on authentication errors
- Graceful fallbacks for missing data

## Performance Optimizations

- Code splitting with lazy routes
- Optimized re-renders with Context API
- Efficient CSS with utility classes
- Image optimization guidelines

## Future Enhancements

- [ ] Search functionality
- [ ] Wishlist feature
- [ ] User profile page
- [ ] Rating and reviews
- [ ] Coupon/Promo codes
- [ ] Real payment gateway integration
- [ ] Order tracking with map
- [ ] Push notifications
- [ ] Dark mode
- [ ] Multi-language support

## Troubleshooting

### CORS Issues
Make sure your backend is running and CORS is enabled:
```javascript
// Backend should have:
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

### Port Already in Use
Change the port in `vite.config.js`:
```javascript
server: {
  port: 3001,
}
```

### API Not Connecting
- Verify backend is running on `http://localhost:5000`
- Check network tab in browser DevTools
- Ensure correct API_URL in `axios.js`

## License

This project is part of MERN Internship Program.

## Support

For issues and questions, please contact the development team.
