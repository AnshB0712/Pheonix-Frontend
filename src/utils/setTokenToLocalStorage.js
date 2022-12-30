
const setTokenToLocalStorage = (token) => {
    
    if(!token) throw new Error("Token that is to be set need to have defined value")

    localStorage.setItem('user',JSON.stringify({
        ... JSON.parse(localStorage.getItem('user')),
        token
    }))
}

export default setTokenToLocalStorage
