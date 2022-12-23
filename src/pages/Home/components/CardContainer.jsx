import React from 'react'

const CardContainer = ({children}) => {
  return (
    <section style={{
        display:'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
        gap: '8px',
        padding: "10px 0",
        overflow: "hidden",
    }}>
      {children}
    </section>
  )
}

export default CardContainer
