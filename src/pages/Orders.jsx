import React, { useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext'

function Orders() {
  const { state, getOrders } = useContext(CartContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userName"))
    if (!user) return
    getOrders(user.id)
  }, [])

  if (state.orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No orders placed yet</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <div className="flex flex-col gap-6">
        {state.orders.map(order => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID: {order.id}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                {order.status}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.brand} | {item.color}
                    </p>
                  </div>

                  <p className="font-semibold text-indigo-600">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end font-bold text-lg">
              Total: ₹{order.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
