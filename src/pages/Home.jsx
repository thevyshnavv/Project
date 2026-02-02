import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { WishListContext } from '../context/WishListContext'
function Home({search}) {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data))
  }, [])

  const {addItemCart} = useContext(CartContext)
  const {addItemWishList} = useContext(WishListContext)

  return (
    <div className="flex flex-wrap gap-6 m-15 ">
      {products
      .filter((pro)=>{const value=`${pro.name}${pro.brand}`
      .toLowerCase() 
      const word=search
      .toLowerCase()
      .trim()
      .split(" ")
    return word.every(word=>value.includes(word))})
    .map((product) => (
        <div key={product.id}>
          <div
            className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
              
            <Link to={`/ProductDetails/${product.id}`}>
            <div className="h-40 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt="pic"
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>


            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-500 truncate">
                {product.name}
              </h2>
              <p className="mt-2 text-blue-600 font-medium">
                {product.price}₹-only
              </p>
              <p className="mt-2 text-gray-600 font-medium">
                {product.description}
              </p>
            </div>
            <div className="flex gap-2 p-4 pt-0">
          <button
            onClick={() => addItemCart(product.id)}
            className="flex-1 bg-black text-white text-sm font-semibold rounded-full hover:brightness-110 transition duration-200 active:scale-95"
          >
            Add to Cart
          </button>

          <button
          // -----------------------------------------------------
          onClick={()=>addItemWishList(product.id)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition duration-200"
            title="Add to Wishlist"
          >
            ❤
          </button>
        </div>
          </div>

        </div>

      ))}
    </div>
  )
}

export default Home