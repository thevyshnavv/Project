import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
      .then(res => setUser(res.data));
  }, [id]);

  const toggleBlock = () => {
    axios.patch(`http://localhost:3000/users/${id}`, {
      isBlock: !user.isBlock
    }).then(res => setUser(res.data));
  };

  if (!user) return null;

  return (
    <div className="p-6 space-y-6">

      {/* USER DETAILS */}
      <div className="bg-white border border-slate-200 rounded-lg px-5 py-4 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          User Details
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
          <p>
            <b>Status:</b>{" "}
            <span className={`text-xs px-2 py-1 rounded-full ${
              user.isBlock
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}>
              {user.isBlock ? "Blocked" : "Active"}
            </span>
          </p>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={toggleBlock}
            className={`px-4 py-2 text-sm rounded-md border ${
              user.isBlock
                ? "border-green-300 text-green-700 hover:bg-green-50"
                : "border-red-300 text-red-600 hover:bg-red-50"
            }`}
          >
            {user.isBlock ? "Unblock User" : "Block User"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm rounded-md border border-slate-300 hover:bg-slate-100"
          >
            Back
          </button>
        </div>
      </div>

      {/* ORDERS */}
      <div className="bg-white border border-slate-200 rounded-lg px-5 py-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Orders</h3>

        {user.orders?.length ? (
          <div className="grid md:grid-cols-2 gap-4">
            {user.orders.map(order => (
              <div
                key={order.id}
                className="border border-slate-200 rounded-lg p-4 shadow-sm hover:bg-slate-50"
              >
                <p className="text-sm"><b>Order ID:</b> {order.id}</p>
                <p className="text-sm"><b>Total:</b> ₹{order.total}</p>
                <p className="text-sm"><b>Status:</b> {order.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No orders found</p>
        )}
      </div>

      {/* WISHLIST */}
      <div className="bg-white border border-slate-200 rounded-lg px-5 py-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Wishlist</h3>

        {user.wishlist?.length ? (
          <div className="grid md:grid-cols-2 gap-4">
            {user.wishlist.map(item => (
              <div
                key={item.id}
                className="border border-slate-200 rounded-lg p-4 shadow-sm hover:bg-slate-50"
              >
                <p className="text-sm"><b>Product:</b> {item.name}</p>
                <p className="text-sm"><b>Price:</b> ₹{item.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Wishlist is empty</p>
        )}
      </div>

      {/* CART */}
      <div className="bg-white border border-slate-200 rounded-lg px-5 py-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Cart</h3>

        {user.cart?.length ? (
          <div className="grid md:grid-cols-2 gap-4">
            {user.cart.map(item => (
              <div
                key={item.id}
                className="border border-slate-200 rounded-lg p-4 shadow-sm hover:bg-slate-50"
              >
                <p className="text-sm"><b>Product:</b> {item.name}</p>
                <p className="text-sm"><b>Qty:</b> {item.quantity}</p>
                <p className="text-sm"><b>Price:</b> ₹{item.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Cart is empty</p>
        )}
      </div>

    </div>
  );
}

export default UserEdit;
