import axios from 'axios'
import React, { useReducer } from 'react'
import { createContext } from 'react'


const initialState = { cart: [] }


const CartContext = createContext(undefined)


const CART_ACTIONS = {
    GET_MY_CART: "getMyCart",
    DELETE_ITEM_CART: "deleteItemCart",
    ADD_ITEM_CART:"addItemCart"
}


const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.GET_MY_CART:
            return { ...state, cart: action.payload }
        case CART_ACTIONS.ADD_ITEM_CART:
            return {...state, cart:action.payload }
        default:
            return state
    }
}
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)


    //this is the function for getcart
    const getCart = async (userId) => {
        const res = await axios.get(`http://localhost:3000/users/${userId}`)
        
        const user = res.data
        dispatch({ type: CART_ACTIONS.GET_MY_CART, payload: user.cart })
    }


    //this is the function for delete items from the cart 
    const addItemCart = async (productId) => {
    try {
      let user = JSON.parse(localStorage.getItem("userName"));
      if (!user) return;

      // get product
      const productRes = await axios.get(`http://localhost:3000/products/${productId}`);
      const product = productRes.data;

      // get user
      const userRes = await axios.get(`http://localhost:3000/users/${user.id}`);
      const currentUser = userRes.data;

      // check if already in cart
      const exists = currentUser.cart.find(item => item.id === productId);
      if (exists) return;

      // add to cart
      const updatedCart = [...currentUser.cart, product];

      // update user cart
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        cart: updatedCart
      })

    } catch (err) {
      console.error(err);
    }
  }
    const value = { state, getCart, addItemCart}
    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
export default CartProvider
export { CartContext, CART_ACTIONS }
 