import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishListContext } from "../context/WishListContext";

function Home({ search }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data));
  }, []);

  const { addItemCart } = useContext(CartContext);
  const { addItemWishList } = useContext(WishListContext);

  // unique categories with one sample image
  const categories = Array.from(
    new Map(
      products.map(p => [p.category, p])
    ).values()
  );

  return (
    <>
      {/* Category Cards */}
      <div className="flex gap-6 m-6 flex-wrap">
        {categories.map(cat => (
          <Link
            key={cat.category}
            to={`/category/${cat.category}`}
            className="w-40 bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            <img
              src={cat.image}
              alt={cat.category}
              className="h-24 w-full object-cover"
            />
            <div className="p-2 text-center font-semibold capitalize">
              {cat.category.replace("_", " ")}
            </div>
          </Link>
        ))}
      </div>

      {/* Products */}
      <div className="flex flex-wrap gap-6 m-15">
        {products
          .filter((pro) => {
            const value = `${pro.name}${pro.brand}`.toLowerCase();
            const words = search.toLowerCase().trim().split(" ");
            return words.every(w => value.includes(w));
          })
          .map(product => (
            <div key={product.id} className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden">
              <Link to={`/ProductDetails/${product.id}`}>
                <img src={product.image} className="h-40 w-full object-cover" />
              </Link>

              <div className="p-2">
                <h2 className="font-bold truncate">{product.name}</h2>
                <p className="text-gray-500 truncate">{product.brand}</p>
                <p className="text-blue-600 font-medium">{product.price}₹</p>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="flex gap-2 p-4 pt-0">
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
          ))}
      </div>
    </>
  );
}

export default Home;
