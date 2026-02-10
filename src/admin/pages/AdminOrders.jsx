import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(res => {
        // extract orders from users
        const allOrders = res.data.flatMap(user =>
          (user.orders || []).map(order => ({
            ...order,
            userName: user.name,
            userEmail: user.email
          }))
        );
        setOrders(allOrders);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-800">
        Orders
      </h2>

      <div className="space-y-3">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-800">
                  Order #{order.id}
                </p>
                <p className="text-sm text-slate-500">
                  {order.userName} • {order.userEmail}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-slate-800">
                  ₹{order.total}
                </p>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="mt-4 space-y-2">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 shadow-sm rounded-lg px-3 py-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.brand} • {item.category}
                    </p>
                  </div>

                  <div className="text-sm font-medium text-slate-800">
                    ₹{item.price}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-3 text-xs text-slate-400">
              Ordered on {new Date(order.date).toLocaleString()}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-slate-500 text-sm">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
