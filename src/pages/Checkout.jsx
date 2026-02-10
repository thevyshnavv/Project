import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const { state, subTotal, total, delivery, addItemOders } = useContext(CartContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onSubmit" })

  const handleOrder = async () => {
    await addItemOders()
    navigate("/orders")
  }

  return (
    <form onSubmit={handleSubmit(handleOrder)}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">

            <div className="flex-[1.5] p-10 border-r border-gray-50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Customer Information
              </h2>

              <div className="space-y-6">
                <div className="space-y-4">

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <input
                        type="text"
                        placeholder="First Name"
                        {...register("firstName", { required: true })}
                        className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none transition"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          First name is required
                        </p>
                      )}
                    </div>

                    <div className="w-1/2">
                      <input
                        type="text"
                        placeholder="Last Name"
                        {...register("lastName", { required: true })}
                        className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none transition"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          Last name is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i
                      })}
                      className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none transition"
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-500 text-xs mt-1">
                        Email is required
                      </p>
                    )}
                    {errors.email?.type === "pattern" && (
                      <p className="text-red-500 text-xs mt-1">
                        Invalid email format
                      </p>
                    )}
                  </div>

                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                    Shipping Address
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Street Address"
                        {...register("street", { required: true })}
                        className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none transition"
                      />
                      {errors.street && (
                        <p className="text-red-500 text-xs mt-1">
                          Street address is required
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <input
                          type="text"
                          placeholder="City"
                          {...register("city", { required: true })}
                          className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none transition"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            City is required
                          </p>
                        )}
                      </div>

                      <div className="w-1/2">
                        <input
                          type="text"
                          placeholder="Postcode"
                          {...register("postcode", { required: true })}
                          className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none transition"
                        />
                        {errors.postcode && (
                          <p className="text-red-500 text-xs mt-1">
                            Postcode is required
                          </p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-10 w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition shadow-lg"
              >
                Continue to Payment
              </button>
            </div>

            <div className="flex-1 bg-gray-50/50 p-10">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                    <div>
                      <p className="text-sm font-medium">Premium Product</p>
                      <p className="text-xs text-gray-500">
                        Qty: {state.cart.length}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">$89.00</span>
                </div>

                <div className="h-px bg-gray-200 my-4"></div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-gray-400 italic">{delivery}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-4">
                    <span>Total</span>
                    <span>₹{subTotal + delivery}</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 text-center">
                  Items will be shipped within 24 hours of payment confirmation.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </form>
  )
}

export default Checkout
