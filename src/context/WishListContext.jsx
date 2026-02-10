import axios from "axios"
import toast from 'react-hot-toast'
import { createContext, useReducer } from "react"

const initialState = { wishlist: [] }
const WishListContext = createContext()

const WISH_LIST_ACTIONS = {
    GET_ITEM_WISH_LIST: "getwishList",
    ADD_ITEM_WISH_LIST: "addwishList",
    REMOVE_ITEM_WISH_LIST: "removeItemWishList"
}

const wishlistReducer = (state, action) => {
  switch (action.type) {

    case WISH_LIST_ACTIONS.GET_ITEM_WISH_LIST:
      return { wishlist: action.payload || [] }

    case WISH_LIST_ACTIONS.ADD_ITEM_WISH_LIST:
      return { wishlist: action.payload || [] }

    case WISH_LIST_ACTIONS.REMOVE_ITEM_WISH_LIST:
      return { wishlist: action.payload || [] }

    default:
      return state
  }
}


const WishListProvider = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, initialState)


    // get cart
    //-------------------------------------------------------------------------------------------------------------
    const getwishList = async (userId) => {
        const res = await axios.get(`http://localhost:3000/users/${userId}`)
        dispatch({
            type: WISH_LIST_ACTIONS.GET_ITEM_WISH_LIST,
            payload: res.data.wishlist
        })
    }

    //add items from the wishlist 
    //-------------------------------------------------------------------------------------------------------------
    const addItemWishList = async (productId) => {
        const user = JSON.parse(localStorage.getItem("userName"))
        if (!user) return

        const productRes = await axios.get(`http://localhost:3000/products/${productId}`)
        const product = productRes.data

        const userRes = await axios.get(`http://localhost:3000/users/${user.id}`)
        const currentUser = userRes.data

        const exitst = currentUser.wishlist.find(item => item.id === productId)
        if (exitst) return

        const updatedWishList = [...currentUser.wishlist, product]

        await axios.patch(`http://localhost:3000/users/${user.id}`, {
            wishlist: updatedWishList
        })
        dispatch({
            type: WISH_LIST_ACTIONS.GET_ITEM_WISH_LIST,
            payload: updatedWishList
        })
        toast.success('Item added to wishlist!')
    }

    //remove function from wishlist
    //-------------------------------------------------------------------------------------------------------------
    const removeItemWishList = async (productId) => {
        const user = JSON.parse(localStorage.getItem("userName"))
        if (!user) return

        const updatedWishList = state.wishlist.filter(item => item.id !== productId)

        await axios.patch(`http://localhost:3000/users/${user.id}`, {
            wishlist: updatedWishList
        })

        dispatch({
            type: WISH_LIST_ACTIONS.REMOVE_ITEM_WISH_LIST,
            payload: updatedWishList
        })
        toast.success('Item removed!')
    }

    return <WishListContext.Provider
        value={{ state, addItemWishList, getwishList, removeItemWishList }}>
        {children}
    </WishListContext.Provider>
}

export default WishListProvider
export { WishListContext, WISH_LIST_ACTIONS }