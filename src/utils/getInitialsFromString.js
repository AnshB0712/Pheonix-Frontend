const getInitialsFromString = (string) => {
    const [first,last] = string?.toUpperCase()?.split(' ')
    return (first[0]+last[0])
}

export default getInitialsFromString
