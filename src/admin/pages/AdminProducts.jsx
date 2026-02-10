import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminProducts() {

  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data))
  }, [])

  // const handleDelete = (id) => {
  //   axios
  //     .delete(`http://localhost:3000/products/${id}`)
  //     .then(() => {
  //       setProducts(prev => prev.filter(product => product.id !== id));
  //     })
  //     .catch(err => console.error(err));
  // };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">
          Products
        </h2>

        <button
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
          onClick={() => navigate(`/admin/products/add`)}
        >
          + Add Product
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex gap-4 bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-sm hover:bg-slate-50 transition"
          >
            {/* Left side (UNCHANGED) */}
            <div className="w-16 h-16 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800">
                {product.name}
              </p>

              <div className="text-sm text-slate-500 flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <span><b>Brand:</b> {product.brand}</span>
                <span><b>Category:</b> {product.category}</span>
                <span><b>Color:</b> {product.color}</span>
              </div>

              <p className="text-sm text-slate-600 mt-1">
                {product.description}
              </p>
            </div>

            {/* Right side (FIXED – ONE LINE) */}
            <div className="flex items-center gap-4">
              {/* Price */}
              <p className="font-semibold text-slate-900 whitespace-nowrap">
                ₹{product.price}
              </p>

              {/* Stock */}
              <span
                className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${product.isStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {product.isStock ? "In Stock" : "Out of Stock"}
              </span>

              {/* Edit */}
              <button
                className="px-3 py-1.5 text-sm rounded-md border border-slate-300 hover:bg-slate-100"
                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
              >
                Edit
              </button>

              {/* Delete */}
              <button className="px-3 py-1.5 text-sm rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => handleDelete(product.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default AdminProducts;
