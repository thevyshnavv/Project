import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/Cartcontext'


function Cart() {
  const { state, getCart } = useContext(CartContext)



  useEffect(() => {
    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    getCart(user.id)
  }, [])
  useEffect(() => {
    console.log(state.cart,'from cart');

  }, [state])


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      <div className="flex flex-col gap-6">
        {state&&state?.cart?.map(item => (
          <div
            key={item.id}
            className="flex bg-white rounded-xl shadow-xl p-6 gap-6"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-40 object-cover rounded-lg"
            />

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Brand: {item.brand} | Color: {item.color}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-lg font-bold text-indigo-600">
                  ₹{item.price}
                </p>
                <p className={item.isStock ? "text-green-600" : "text-red-500"}>
                  {item.isStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
