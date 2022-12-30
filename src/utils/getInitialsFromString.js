const getInitialsFromString = (string) => {
    let initials = ''
    const [first,last] = string.toUpperCase().split(' ')
  return (initials+first[0]+last[0])
}

export default getInitialsFromString
