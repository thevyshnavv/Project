import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from '../pages/Home';
import LoginFrom from '../components/auth/LoginFrom';
import RegisterForm from '../components/auth/RegisterForm';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import CartProvider from '../context/Cartcontext';
import WishList from '../pages/WishList';
import Orders from '../pages/Orders';

function AppRoutes() {
  return (
    <div>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/loginform' element={<LoginFrom />} />
            <Route path='/registerform' element={<RegisterForm />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/productdetails/:id' element={<ProductDetails />} />
            <Route path='/wishlist/:id' element={<WishList />} />
            <Route path='/orders/:id' element={<Orders />} />
          </Routes>
          <ToastContainer />
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  )
}

export default AppRoutes
