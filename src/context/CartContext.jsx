import axios from 'axios'
import React, { useReducer, useState } from 'react'
import { createContext,useContext } from 'react'


const initialState = {cart:[]}


const CartContext = createContext(undefined)


const CART_ACTIONS = {
    GET_MY_CART : "getMyCart"
}
const cartReducer = async(state, action)=>{
    switch(action.type){
        case CART_ACTIONS.GET_MY_CART:
            const res = await axios.get(`http://localhost:3000/users/${action.data.id}`)
            const user = res.data
            state.cart= user.cart
            console.log(user);
            
            return state
            
        case "bye":
            state = "I'm out"
            return state
    }
}
const CartProvider = ({children})=>{
    const [state, dispatch] = useReducer(cartReducer, initialState)
    const getCart = (userId)=>{
        dispatch({type:CART_ACTIONS.GET_MY_CART,data:{id:userId}})
    }
    const value = {state,getCart}
    return <CartContext.Provider value={value}>
        {children }
    </CartContext.Provider>
}



export default CartProvider
export {CartContext,CART_ACTIONS}
