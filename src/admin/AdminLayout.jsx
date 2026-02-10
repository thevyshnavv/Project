import { Outlet, Link, Navigate } from "react-router-dom";

function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("userName"));

  // protect admin route
  if (!user || user.role !== "admin") {
    return <Navigate to="/loginform" replace />;
  }

  return (
  <div className="flex min-h-screen">
    {/* Sidebar */}
    <div className="w-60 bg-[oklch(89.7%_0.196_126.665)] p-6 flex flex-col gap-6 sticky top-0 h-screen">
      <h3 className="text-xl font-semibold text-emerald-900">
        Admin Panel
      </h3>

      <nav className="flex flex-col gap-4">
        <Link
          to="/admin"
          className="px-4 py-3 rounded-xl font-medium text-emerald-900 bg-white/60 shadow-md hover:shadow-lg transition"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/users"
          className="px-4 py-3 rounded-xl font-medium text-emerald-900 bg-white/60 shadow-md hover:shadow-lg transition"
        >
          Users
        </Link>

        <Link
          to="/admin/products"
          className="px-4 py-3 rounded-xl font-medium text-emerald-900 bg-white/60 shadow-md hover:shadow-lg transition"
        >
          Products
        </Link>

        <Link
          to="/admin/orders"
          className="px-4 py-3 rounded-xl font-medium text-emerald-900 bg-white/60 shadow-md hover:shadow-lg transition"
        >
          Orders
        </Link>
      </nav>
    </div>

    {/* Content */}
    <div className="flex-1 p-6 bg-slate-50">
      <Outlet />
    </div>
  </div>
);
}

export default AdminLayout;
