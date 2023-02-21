import { useContext,createContext } from "react";
import { useReducerAsync } from "use-reducer-async";
import customAxios from "../api/axios";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const userAuthReducer = (state,{action}) => {

    const {type,payload} = action
    console.log(type)

    if(type === 'USER_LOADING') return ({
       ...state,
        isUserLoading: true
    })

    if(type === 'USER_ERROR') return ({
        ...state,
        userError:payload,
    })
    if(type === 'USER_DATA') return ({
        ...state,
        user:payload,
    })
    if(type === 'UPADTE_USER_TOKEN') return ({
        ...state,
        user:{
            ...state.user,
            token: payload
        },
    })
    if(type === 'USER_FINISHED') return ({
        ...state,
        isUserLoading: false
    })
    if(type === 'USER_CLEAR') return ({
        ...state,
        user: ''
    })

    return ({user:'',userError:undefined,isUserLoading: false})

}

const userAsyncActionHandlers = {
    INITIATE_USER_AUTH: ({dispatch,signal}) => async (args) => {
        const { payload: { token,state } } = args
        try {
            dispatch({action: {type: 'USER_LOADING'}})
            const {data} = await customAxios.post("auth/whatsapp-login",{ token,state })
            dispatch({action: {type: 'USER_DATA',payload:data}}) 
        } catch (error) {
              if(!signal.aborted) dispatch({action: {type: 'USER_ERROR',payload:error}})
            } finally{
              dispatch({action: {type: 'USER_FINISHED'}})
          }
    },
    LOGOUT_USER: ({dispatch}) => async() => {
        try {
            dispatch({action: {type: 'USER_LOADING'}})
            await customAxios.get('shared/logout')
            dispatch({action: {type: 'USER_CLEAR'}})
        } catch (error) {
              dispatch({action: {type: 'USER_DATA',payload:error}})
            } finally{
              dispatch({action: {type: 'USER_FINISHED'}})
          }
    }
}

const AuthProvider = ({children}) => {

    const [user,dispatch] = useReducerAsync(userAuthReducer,{
     isUserLoading: false,
     userError: undefined,
     user: undefined
    },userAsyncActionHandlers)

    return(
        <AuthContext.Provider value={{user,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider