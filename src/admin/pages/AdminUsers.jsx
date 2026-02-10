import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(res => setUsers(res.data));
  }, []);

  // check if admin exists
  const hasAdmin = users.some(user => user.role === "admin");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">
          Users
        </h2>
      </div>

      {/* Admin hidden info block */}
      {hasAdmin && (
        <div className="mb-4 text-sm text-slate-500">
          Admin users are hidden from this list.
        </div>
      )}

      {/* Users List */}
      <div className="space-y-3">
        {users
          .filter(user => user.role !== "admin")
          .map((user) => (
            <div
              onClick={() => navigate(`/admin/users/${user.id}`)}
              key={user.id}
              className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-sm hover:bg-slate-100 transition"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-medium text-slate-700">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <p className="font-medium text-slate-800">
                  {user.name}
                </p>
                <p className="text-sm text-slate-500">
                  {user.email}
                </p>
              </div>

              {/* Role */}
              <div className="w-28">
                <span
                  className={`text-xs px-2 py-1 rounded-full capitalize ${user.isBlock
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                    }`}
                >
                  {user.isBlock ? "Blocked" : "Active"}
                </span>
              </div>


              {/* Actions */}
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm rounded-md border border-slate-300 hover:bg-slate-100">
                  Edit
                </button>
                <button className="px-3 py-1.5 text-sm rounded-md border border-red-300 text-red-600 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminUsers;
