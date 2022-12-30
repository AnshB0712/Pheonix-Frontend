import { useState } from "react";
import { useContext,createContext,useReducer,useEffect } from "react";
import { CART_CONTEXT_ACTIONS } from "../constants";

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

const reducer = (state,action) => {
    const {type,payload} = action
    if(type === CART_CONTEXT_ACTIONS.ADD_TO_CART){
        return [...state,{...payload}]
    }
    if(type === CART_CONTEXT_ACTIONS.DELETE_CART){
        return []
    }


    if(type === CART_CONTEXT_ACTIONS.SET_CART){
        console.log(CART_CONTEXT_ACTIONS.SET_CART);
        return [...payload]
    }

    if(type === CART_CONTEXT_ACTIONS.REMOVE_FROM_CART){
        return [...state.filter(item => item.itemName !== payload.itemName)]
    }

    if(type === CART_CONTEXT_ACTIONS.MANIPULATE_QTY){
        let tempCart = state.map((item) => {
            if(item.name === payload.itemName){
                return {...item,qty: payload.sign === '+' ? item.qty + 1 : item.qty - 1}
            }
            return item
        }).filter(item => item.qty !== 0)
        return [...tempCart]
    }
}

const CartContextProvider = ({children}) => {

    // TO PERSIST CART BETWEEN SIGNUPS AS FOR SIGN UP USER WILL GO TO DIFFERENT TAB
    const localStorageOrder = localStorage.getItem('order')

    const [cartState,dispatch] = useReducer(reducer,localStorageOrder ? JSON.parse(localStorageOrder)['cart'] : [])

    // DERIVED STATES
    const totalValue = cartState.reduce((acc,cur)=>{ return acc + cur.qty*cur.perPrice},0)
    const orderItems = cartState.map(item => ({itemName:item.name,itemId:item._id,qty:item.qty,perPrice:item.perPrice}))

    // ORDER TYPE DINE OR TAKE OUT
    const [orderType,setOrderType] = useState(localStorageOrder ? JSON.parse(localStorageOrder)['orderType'] : '7')

    useEffect(() => {
        localStorage.setItem('order',JSON.stringify({cart:cartState,orderType}))
    },[cartState,orderType])

    return (
        <CartContext.Provider value={{cartState,dispatch,setOrderType,orderType,totalValue,orderItems}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider