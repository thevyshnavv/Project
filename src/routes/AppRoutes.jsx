import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

import Home from '../pages/Home'
import LoginFrom from '../components/auth/LoginFrom'
import RegisterForm from '../components/auth/RegisterForm'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import WishList from '../pages/WishList'
import Orders from '../pages/Orders'
import Checkout from '../pages/Checkout'

import CartProvider from '../context/CartContext'
import WishListProvider from '../context/WishListContext'

// layouts
import UserLayout from '../layout/UserLayout'
import AdminLayout from '../admin/AdminLayout'

// admin pages
import AdminDashboard from '../admin/pages/AdminDashboard'
import AdminUsers from '../admin/pages/AdminUsers'
import AdminProducts from '../admin/pages/AdminProducts'
import AdminOrders from '../admin/pages/AdminOrders'
import EditProducts from '../admin/pages/EditProducts'
import AddProduct from '../admin/pages/AddProduct'
import CategoryProducts from '../pages/CategoryProducts'
import UserEdit from '../admin/pages/UserEdit'

function AppRoutes() {
  const [search, setSearch] = useState("")

  return (
    <CartProvider>
      <WishListProvider>
        <BrowserRouter>
          <Routes>

            {/* USER LAYOUT */}
            <Route element={<UserLayout search={search} setSearch={setSearch} />}>
              <Route path="/" element={<Home search={search} />} />
              <Route path="/loginform" element={<LoginFrom />} />
              <Route path="/registerform" element={<RegisterForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/productdetails/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/category/:category" element={<CategoryProducts />} />

            </Route>

            {/* ADMIN LAYOUT */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/products/edit/:id" element={<EditProducts />} />
              <Route path='/admin/products/add' element={<AddProduct />} />
              <Route path="/admin/users/:id" element={<UserEdit />} />
            </Route>

          </Routes>

          <Toaster position="top-center" />
        </BrowserRouter>
      </WishListProvider>
    </CartProvider>
  )
}

export default AppRoutes
