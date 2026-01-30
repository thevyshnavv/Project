import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/Cartcontext'
function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data))
  }, [])

  const {addItemCart} = useContext(CartContext)


  return (
    <div className="flex flex-wrap gap-6 m-15">
      {products.map((y) => (
        <div key={y.id}>
          <div
            className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
              
            <Link to={`/ProductDetails/${y.id}`}>
            <div className="h-40 w-full overflow-hidden">
                <img
                  src={y.image}
                  alt="pic"
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>


            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {y.name}
              </h2>
              <p className="mt-2 text-blue-600 font-medium">
                {y.price}₹
              </p>
              <p className="mt-2 text-gray-600 font-medium">
                {y.description}
              </p>
            </div>
            <button onClick={() => addItemCart(y.id)} className='bg-black text-white px-2 m-2 rounded-full font-medium hover:bg-gray-800 transition duration-200 active:scale-95'>
              Add Cart
            </button>
          </div>

        </div>

      ))}
    </div>
  )
}

export default Home