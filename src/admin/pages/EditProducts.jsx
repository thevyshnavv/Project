import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ FULL product state (ALL fields)
  const [product, setProduct] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    isStock: false,
    brand: "",
    color: "",
    category: ""
  });

  // ✅ fetch product by id
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // ✅ handle ALL inputs (including boolean)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct(prev => ({
      ...prev,
      [name]: name === "isStock" ? value === "true" : value
    }));
  };

  // ✅ update ALL product fields
  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/products/${id}`, product)
      .then(() => navigate("/admin/products"))
      .catch(err => console.error(err));
  };

  return (
  <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow">
    <h2 className="text-2xl font-semibold text-slate-800 mb-6">
      Edit Product
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Name */}
      <div>
        <label className="text-sm text-slate-600">Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full mt-1 border rounded-lg px-3 py-2"
        />
      </div>

      {/* Brand */}
      <div>
        <label className="text-sm text-slate-600">Brand</label>
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          className="w-full mt-1 border rounded-lg px-3 py-2"
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm text-slate-600">Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full mt-1 border rounded-lg px-3 py-2"
        />
      </div>

      {/* Color */}
      <div>
        <label className="text-sm text-slate-600">Color</label>
        <input
          type="text"
          name="color"
          value={product.color}
          onChange={handleChange}
          className="w-full mt-1 border rounded-lg px-3 py-2"
        />
      </div>

      {/* Price */}
      <div>
        <label className="text-sm text-slate-600">Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full mt-1 border rounded-lg px-3 py-2"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="text-sm text-slate-600">Stock Status</label>
        <select
          name="isStock"
          value={product.isStock}
          onChange={handleChange}
          className="w-full mt-1 border rounded-lg px-3 py-2"
        >
          <option value={true}>In Stock</option>
          <option value={false}>Out of Stock</option>
        </select>
      </div>

      {/* Image */}
      <div className="md:col-span-2">
        <label className="text-sm text-slate-600">Image URL</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="w-full mt-1 border rounded-lg px-3 py-2"
        />
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="text-sm text-slate-600">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          rows="4"
          className="w-full mt-1 border rounded-lg px-3 py-2 resize-none"
        />
      </div>
    </div>

    {/* Image Preview */}
    {product.image && (
      <div className="mt-6">
        <p className="text-sm text-slate-600 mb-2">Image Preview</p>
        <img
          src={product.image}
          alt="preview"
          className="w-44 h-44 object-cover rounded-lg border"
        />
      </div>
    )}

    {/* Actions */}
    <div className="flex gap-4 mt-8">
      <button
        onClick={handleUpdate}
        className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
      >
        Update Product
      </button>

      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 border rounded-lg hover:bg-slate-100"
      >
        Cancel
      </button>
    </div>
  </div>
);
}

export default EditProducts;
