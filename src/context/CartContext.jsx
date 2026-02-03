import axios from 'axios'
import React, { useReducer, createContext } from 'react'
import toast from 'react-hot-toast'

const initialState = { cart: [], orders: [] }

const CartContext = createContext()

const CART_ACTIONS = {
  GET_MY_CART: "getMyCart",
  REMOVE_ITEM_CART: "removeItemCart",
  ADD_ITEM_CART: "addItemCart",
  ADD_ITEM_ORDERS: "addOrderItem"
}

const Reducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.GET_MY_CART:
      return { ...state, cart: action.payload }

    case CART_ACTIONS.ADD_ITEM_CART:
      return { ...state, cart: action.payload }

    case CART_ACTIONS.REMOVE_ITEM_CART:
      return { ...state, cart: action.payload }

    case CART_ACTIONS.ADD_ITEM_ORDERS:
      return { ...state, orders: action.payload }

    default:
      return state
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  // get cart
  const getCart = async (userId) => {
    const res = await axios.get(`http://localhost:3000/users/${userId}`)
    dispatch({
      type: CART_ACTIONS.GET_MY_CART,
      payload: res.data.cart
    })
  }

  //add item to order
  const addItemOders = async () => {
    const user = JSON.parse(localStorage.getItem("userName"))
    if (!user) return

    const userRes = await axios.get(`http://localhost:3000/users/${user.id}`)
    const currentUser = userRes.data

    if (currentUser.cart.length === 0) return

    const newOrder = {
      id: Date.now(),
      items: currentUser.cart,
      total: currentUser.cart.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toISOString(),
      status: "Order placed"
    }

    const updateOrders = [...currentUser.orders, newOrder]

    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      orders: updateOrders,
      cart: []
    })
    
    dispatch({
      type: CART_ACTIONS.ADD_ITEM_ORDERS,
      payload: updateOrders
    })

    dispatch({
      type: CART_ACTIONS.GET_MY_CART,
      payload: []
    })
    toast.success("Order placed successfully")
  }
  // get orders
const getOrders = async (userId) => {
  const res = await axios.get(`http://localhost:3000/users/${userId}`)
  dispatch({
    type: CART_ACTIONS.ADD_ITEM_ORDERS,
    payload: res.data.orders
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
    toast.success('Item added to cart!')
  }

  const subTotal = state.cart.reduce((sum, item) => sum + item.price, 0)
  const delivery = state.cart.length > 0 ? 40 : 0
  const total = subTotal + delivery

  // remove item from cart
  const removeItemCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem("userName"))
    if (!user) return

    const updatedCart = state.cart.filter(item => item.id !== productId)

    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      cart: updatedCart
    })

    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM_CART,
      payload: updatedCart
    })
    toast.success('Item removed from cart!')
  }

  return (
    <CartContext.Provider
      value={{
        state,
        getCart,
        addItemCart,
        removeItemCart,
        addItemOders,
        getOrders,
        subTotal,
        delivery,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
export { CartContext, CART_ACTIONS }
