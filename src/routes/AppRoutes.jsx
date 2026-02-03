import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import LoginFrom from '../components/auth/LoginFrom';
import RegisterForm from '../components/auth/RegisterForm';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import CartProvider from '../context/CartContext';
import WishList from '../pages/WishList';
import Orders from '../pages/Orders';
import WishListProvider from '../context/WishListContext';
import Checkout from '../pages/Checkout';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast'


function AppRoutes() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <CartProvider>
        <WishListProvider>
          <BrowserRouter>
            <Header search={search} setSearch={setSearch} />
            <Routes>
              <Route path='/' element={<Home search={search} />} />
              <Route path='/loginform' element={<LoginFrom />} />
              <Route path='/registerform' element={<RegisterForm />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/productdetails/:id' element={<ProductDetails />} />
              <Route path='/wishlist' element={<WishList />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/checkout' element={<Checkout />} />
            </Routes>
            <Toaster position="top-center" />
            <Footer />
          </BrowserRouter>
        </WishListProvider>
      </CartProvider>
    </div>
  )
}

export default AppRoutes
