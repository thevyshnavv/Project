import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";


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
  const chartData = users
  .filter(user => user.role !== "admin")
  .map(user => ({
    name: user.name || "User",
    orders: user.orders?.length || 0,
    revenue: user.orders?.reduce(
      (sum, order) => sum + order.total,
      0
    ) || 0
  }));




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
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Orders Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Orders per User
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#000000"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Revenue per User
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>


    </div>
  );

}

export default AdminDashboard;
