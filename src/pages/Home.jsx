import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishListContext } from "../context/WishListContext";
const ShimmerBox = ({ className }) => (
  <div className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
    animate-shimmer bg-[length:1000px_100%] ${className}`} />
);


function Home({ search }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      });
  }, []);

  const { addItemCart } = useContext(CartContext);
  const { state: wishState, addItemWishList, removeItemWishList } =
  useContext(WishListContext);


  // unique categories with one sample image
  const categories = Array.from(
    new Map(
      products.map(p => [p.category, p])
    ).values()
  );
  const isInWishlist = (id) =>
  wishState.wishlist.some(item => item.id === id);


  return (
    <>
      {/* Category Cards */}
      <div className="w-full flex justify-center">
  <div className="max-w-6xl w-full px-6">
    <div className="flex flex-wrap justify-center gap-8 py-8">
      {loading
        ? Array(10).fill(0).map((_, i) => (
            <div
              key={i}
              className="w-44 bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <ShimmerBox className="h-28 w-full" />
              <div className="p-3 flex justify-center">
                <ShimmerBox className="h-4 w-3/4 rounded-md" />
              </div>
            </div>
          ))
        : categories.map(cat => (
            <Link
              key={cat.category}
              to={`/category/${cat.category}`}
              className="w-44 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-3 transition-all duration-300 overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.category}
                className="h-28 w-full object-cover"
              />
              <div className="p-3 text-center text-sm font-semibold capitalize tracking-wide">
                {cat.category.replace("_", " ")}
              </div>
            </Link>
          ))}
    </div>
  </div>
</div>


      {/* Products */}
      <div className="flex flex-wrap gap-6 m-15">
        {loading
          ? Array(8).fill(0).map((_, i) => (
            <div key={i} className="w-64 bg-white rounded-xl shadow overflow-hidden">
              <ShimmerBox className="h-40 w-full" />
              <div className="p-2 space-y-2">
                <ShimmerBox className="h-4 w-full rounded" />
                <ShimmerBox className="h-3 w-3/4 rounded" />
                <ShimmerBox className="h-4 w-1/2 rounded" />
              </div>
              <div className="flex gap-2 p-4">
                <ShimmerBox className="h-10 flex-1 rounded-full" />
                <ShimmerBox className="h-10 w-10 rounded-full" />
              </div>
            </div>
          ))
          : products
            .filter((pro) => {
              const value = `${pro.name}${pro.brand}`.toLowerCase();
              const words = search.toLowerCase().trim().split(" ");
              return words.every(w => value.includes(w));
            })
            .map(product => (
              <div key={product.id} className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden hover:-translate-y-3 transition-all duration-300">
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
