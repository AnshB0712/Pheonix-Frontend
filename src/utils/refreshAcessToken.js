import setTokenToLocalStorage from "./setTokenToLocalStorage"
import customAxios from "../api/axios"

const refreshAcessToken = async () => {
    const {data} = await customAxios.get('/renew')
    setTokenToLocalStorage(data?.token)
     return data?.token
}

export default refreshAcessToken
