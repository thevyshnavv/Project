import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  // ✅ full initial state (all product entities)
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

  // ✅ handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: name === "isStock" ? value === "true" : value
    });
  };

  // ✅ add product to DB
  const handleAddProduct = () => {
    axios
      .post("http://localhost:3000/products", product)
      .then(() => {
        navigate("/admin/products");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        Add Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleAddProduct}
          className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
        >
          Add Product
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

export default AddProduct;
