const getTokenFromLocalStorage = () => {
  return (JSON.parse(localStorage.getItem('user'))?.token)
}

export default getTokenFromLocalStorage
