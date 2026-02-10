import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(res => setUsers(res.data));

    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data));
  }, []);

  // calculations
  const totalUsers = users.length;
  const totalProducts = products.length;

  const totalOrders = users.reduce(
    (sum, user) => sum + (user.orders?.length || 0),
    0
  );

  const revenue = users.reduce((sum, user) => {
  return (
    sum +
    (user.orders?.reduce((oSum, order) => oSum + order.total, 0) || 0)
  );
}, 0);


  return (
  <div className="p-6 space-y-6">
    {/* Header */}
    <h2 className="text-2xl font-semibold text-slate-800">
      Dashboard
    </h2>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <p className="text-sm text-slate-500">Total Users</p>
        <h3 className="text-2xl font-semibold text-slate-800">{totalUsers}</h3>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <p className="text-sm text-slate-500">Total Products</p>
        <h3 className="text-2xl font-semibold text-slate-800">{totalProducts}</h3>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <p className="text-sm text-slate-500">Orders</p>
        <h3 className="text-2xl font-semibold text-slate-800">{totalOrders}</h3>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <p className="text-sm text-slate-500">Revenue</p>
        <h3 className="text-2xl font-semibold text-slate-800">₹{revenue}</h3>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-medium text-slate-800 mb-4">
        Recent Activity
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">New user registered</span>
          <span className="text-slate-400">2 min ago</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-600">New order placed</span>
          <span className="text-slate-400">10 min ago</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Product added</span>
          <span className="text-slate-400">1 hour ago</span>
        </div>
      </div>
    </div>
  </div>
);

}

export default AdminDashboard;
