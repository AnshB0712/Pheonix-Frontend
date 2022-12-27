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
    const orderItems = cartState.map(item => ({itemName:item.name,qty:item.qty,perPrice:item.perPrice}))

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


// orderByName: {
//     type: String,
//     required: [true,"Name required to create an order!"]
// },
// orderByMobile: {
//     type: String,
//     required: [true,"Phone Number required to create an order!"]
// },
// orderBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: [true,"Phone Number required to create an order!"]
// },
// orderType:{
//     type: Number,
//     enum: [7,13],
//     default:  7
// },
// orderStatus:{
//     type: String,
//     enum: ["SXS","PNDG"],
//     default: "PNDG"
// },
// amount: {
//     type: Number,
//     required: [true,"Amount is required to create orders!"]
// },
// items: [
//     {
//         itemName:{
//             type: String,
//             required: [true,"Item name is required to create orders!"]
//         },
//         qty:{
//             type: Number,
//             required: [true,"Quantity is required to create orders!"]
//         },
//     }
// ],
// PaymentStatus: {
//     type: String,
//     enum: ["SXS","PNDG","FLD"],
//     default: "PNDG"
// }