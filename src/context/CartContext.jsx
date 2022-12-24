import { useContext,createContext,useReducer,useMemo } from "react";
import { CART_CONTEXT_ACTIONS } from "../constants";

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

const reducer = (state,action) => {
    const {type,payload} = action

    if(type === CART_CONTEXT_ACTIONS.ADD_TO_CART){
        return [...state,{...payload}]
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
    const [cartState,dispatch] = useReducer(reducer,[])
    const memoisedValue = useMemo(() => ({cartState,dispatch}))
    return (
        <CartContext.Provider value={memoisedValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider