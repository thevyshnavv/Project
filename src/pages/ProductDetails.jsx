import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/Cartcontext'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  const {addItemCart} = useContext(CartContext)

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
      
      {/* Image section */}
      <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-sm object-contain"
        />
      </div>

      {/* Details section */}
      <div className="md:w-1/2 p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {product.name}
        </h1>

        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>

        <p className="text-2xl font-bold text-gray-900">
          ₹{product.price}
        </p>

        <p className="text-sm text-gray-500">
          Color: <span className="text-gray-800 font-medium">{product.color}</span>
        </p>

        {product.isStock ? (
          <p className="text-green-600 font-medium">In Stock</p>
        ) : (
          <p className="text-red-500 font-medium">Out of Stock</p>
        )}

        <button onClick={()=>addItemCart(product.id)} className="mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
          Add to Cart
        </button>
      </div>

    </div>
  </div>
);

}

export default ProductDetails
