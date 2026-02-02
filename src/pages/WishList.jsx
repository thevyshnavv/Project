import React, { useContext, useEffect } from 'react'
import { WishListContext } from '../context/WishListContext'
import { CartContext } from '../context/CartContext'

function WishList() {
  const { state, getwishList, removeItemWishList } = useContext(WishListContext)
  const {addItemCart} = useContext(CartContext)

  useEffect(() => {
    let user = localStorage.getItem("userName")
    user = JSON.parse(user)
    getwishList(user?.id)
  }, [])
  return (
    <div className="min-h-screen mx-50">
      <h1 className="text-2xl font-semibold mb-6">WISH List</h1>

      <div className="flex gap-8 items-start">
        {/* Products Section */}
        <div className="w-full flex flex-col gap-8">
          {state && state?.wishlist?.map(item => (
            <div
              key={item.id}
              className="
              flex
              w-[80%]
              bg-white
              rounded-2xl
              shadow-2xl
              p-8
              gap-8
            "
            >
              {/* Bigger Image */}
              <img
                src={item.image}
                alt={item.name}
                className="
                w-100
                object-cover
                rounded-xl
              "
              />

              {/* Right Content */}
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h2 className="text-2xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                  <p className="mt-3 text-sm text-gray-500">
                    Brand: {item.brand} | Color: {item.color}
                  </p>
                  <p className="mt-3 text-sm text-gray-500">
                    is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                  </p>
                </div>

                <div className="mt-6 flex justify-between items-end">
                  <div>
                    <p className="text-xl font-bold text-indigo-600">
                      ₹{item.price}
                    </p>
                    <p
                      className={
                        item.isStock
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {item.isStock ? "In Stock" : "Out of Stock"}
                    </p>

                  </div>

                  {/* Button */}
                  <button
                    onClick={() => addItemCart(item.id)}
                    className="
                    bg-black
                    text-white
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    hover:bg-blue-500
                    transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="
                    bg-red-500
                    text-white
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    hover:bg-red-600
                    transition
                  "
                    onClick={() => removeItemWishList(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

}

export default WishList