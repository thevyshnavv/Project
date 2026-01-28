import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductDetails from './ProductDetails'

function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data))
  }, [])

  return (
    <div className="flex flex-wrap gap-6 m-15">
      {products.map((y) => (
        <Link to={`/ProductDetails/${y.id}`}>
        <div
          key={y.id}
          className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          <div className="h-40 w-full overflow-hidden">
            <img
              src={y.image}
              alt="pic"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {y.name}
            </h2>
            <p className="mt-2 text-gray-600 font-medium">
              ₹{y.price}
            </p>
          </div>
        </div>
        </Link>
      ))}
    </div>


  )
}

export default Home