import axios from 'axios'
import React, { useReducer } from 'react'
import { createContext } from 'react'


const initialState = { cart: [] }


const CartContext = createContext(undefined)


const CART_ACTIONS = {
    GET_MY_CART: "getMyCart"
}
const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.GET_MY_CART:
            return { ...state, cart: action.payload }
    }
}
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)
    const getCart = async (userId) => {
        const res = await axios.get(`http://localhost:3000/users/${userId}`)
        const user = res.data
        console.log(user?.cart);

        dispatch({ type: CART_ACTIONS.GET_MY_CART, payload: user.cart })
    }
    const value = { state, getCart }
    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}



export default CartProvider
export { CartContext, CART_ACTIONS }
