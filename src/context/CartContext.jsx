import axios from 'axios'
import React, { useReducer, createContext } from 'react'

const initialState = { cart: [] }

const CartContext = createContext()

const CART_ACTIONS = {
  GET_MY_CART: "getMyCart",
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.GET_MY_CART:
      return { cart: action.payload }

    case CART_ACTIONS.ADD_ITEM_CART:
      return { cart: action.payload }

    case CART_ACTIONS.DELETE_ITEM_CART:
      return { cart: action.payload }

    default:
      return state
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // get cart
  const getCart = async (userId) => {
    const res = await axios.get(`http://localhost:3000/users/${userId}`)
    dispatch({
      type: CART_ACTIONS.GET_MY_CART,
      payload: res.data.cart
    })
  }

  // add item to cart
  const addItemCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem("userName"))
    if (!user) return

    const productRes = await axios.get(`http://localhost:3000/products/${productId}`)
    const product = productRes.data

    const userRes = await axios.get(`http://localhost:3000/users/${user.id}`)
    const currentUser = userRes.data

    const exists = currentUser.cart.find(item => item.id === productId)
    if (exists) return

    const updatedCart = [...currentUser.cart, product]

    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      cart: updatedCart
    })

    dispatch({
      type: CART_ACTIONS.ADD_ITEM_CART,
      payload: updatedCart
    })
  }

  // remove item from cart
  const removeItemCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem("userName"))
    if (!user) return

    const updatedCart = state.cart.filter(item => item.id !== productId)

    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      cart: updatedCart
    })

    dispatch({
      type: CART_ACTIONS.DELETE_ITEM_CART,
      payload: updatedCart
    })
  }

  return (
    <CartContext.Provider
      value={{ state, getCart, addItemCart, removeItemCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
export { CartContext, CART_ACTIONS }
