import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { WishListContext } from "../context/WishListContext";
import { CartContext } from "../context/CartContext";

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { addItemCart } = useContext(CartContext);
  const { addItemWishList } = useContext(WishListContext);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data));
  }, []);

  const filtered = products.filter(p => p.category === category);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 capitalize">
        {category.replace("_", " ")}
      </h2>

      <div className="flex flex-wrap gap-6">
        {filtered.map(product => (
          <div key={product.id} className="w-64 bg-white rounded-xl shadow-md">
            <Link to={`/ProductDetails/${product.id}`}>
              <img src={product.image} className="h-40 w-full object-cover" />
            </Link>
            <div className="p-3">
              <h3 className="font-bold truncate">{product.name}</h3>
              <p className="text-gray-500">{product.brand}</p>
              <p className="text-blue-600">{product.price}₹</p>
              <div className="flex gap-2  pt-0">
                <button
                  onClick={() => addItemCart(product.id)}
                  className="flex-1 bg-black text-white rounded-full"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addItemWishList(product.id)}
                  className="w-10 h-10 rounded-full border"
                >
                  ❤
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
