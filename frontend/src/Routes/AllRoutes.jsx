import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../Pages/AdminDashboard';
import Home from '../Pages/Homepage/Home';
import SinglePage from '../Components/Products/SingleCArd';
import { Product } from '../Pages/Product';
import AdminProducts from '../Pages/AdminProducts';
import AdminProductEdit from '../Pages/AdminProductEdit';
import AllUsers from '../AdminPage/AllUsers';
import Payment from '../Components/Products/Payment';
import { StripeProvider } from '../Components/Products/StripeProvider';
import Cart from '../Components/Products/cart';
import OrderHistory from '../Pages/Orders/OrderHistory';
import OrderTracking from '../Pages/Orders/OrderTracking';
import AdminLogin from '../Pages/AdminLogin';
import AdminOrders from '../Pages/AdminOrders';
import Wishlist from '../Pages/Wishlist/Wishlist';
import ProtectedRoute from './ProtectedRoute';



const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admindashboard' element={<ProtectedRoute element={<AdminDashboard/>} requiredRole="admin" />}/>
            <Route path="/eyeglasses/:id" element={<SinglePage />} />
            <Route path='/eyeglasses' element={<Product />} />
            <Route path='/adminproducts' element={<ProtectedRoute element={<AdminProducts />} requiredRole="admin" />} />
            <Route path="/allusers" element={<ProtectedRoute element={<AllUsers/>} requiredRole="admin" />}></Route>
            <Route path='/adminproducts/update/:id' element={<ProtectedRoute element={<AdminProductEdit />} requiredRole="admin" />} />
            <Route path='/payment' element={<StripeProvider><Payment /></StripeProvider>} />
            <Route path='/myorders' element={<OrderHistory/>} />
            <Route path='/wishlist' element={<Wishlist/>} />
            <Route path='/ordertracking/:orderId' element={<OrderTracking/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/adminlogin' element={<AdminLogin/>}/>
            <Route path='/adminorders' element={<ProtectedRoute element={<AdminOrders/>} requiredRole="admin" />}/>
        </Routes>
    )
};

export default AllRoutes;