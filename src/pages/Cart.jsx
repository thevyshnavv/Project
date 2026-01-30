import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/Cartcontext'


function Cart() {
  const { state, getCart, removeItemCart } = useContext(CartContext)



  useEffect(() => {
    let user = localStorage.getItem("userName")
    user = JSON.parse(user)
    console.log(user)
    getCart(user?.id)
  }, [])
  
 return (
  <div className="min-h-screen p-8">
    <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

    <div className="flex gap-8 items-start">
      {/* Products Section */}
      <div className="w-2/3 flex flex-col gap-6">
        {state && state?.cart?.map(item => (
          <div
            key={item.id}
            className="flex bg-white rounded-xl shadow-xl p-6 gap-6"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-40 object-cover rounded-lg"
            />

            <div className="flex flex-col justify-between w-full">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Brand: {item.brand} | Color: {item.color}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-end">
                <div>
                  <p className="text-lg font-bold text-indigo-600">
                    ₹{item.price}
                  </p>
                  <p className={item.isStock ? "text-green-600" : "text-red-500"}>
                    {item.isStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  className="
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    hover:bg-red-600
                    transition
                  "
                  onClick={()=>removeItemCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="w-1/3">
        <div className="sticky top-28 bg-white rounded-xl shadow-xl p-6 max-h-[calc(100vh-200px)]">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal (1 item)</span>
            <span>₹20000</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Delivery Charge</span>
            <span>₹50</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Tax</span>
            <span>₹0</span>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹45678</span>
          </div>

          <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
)



}

export default Cart
