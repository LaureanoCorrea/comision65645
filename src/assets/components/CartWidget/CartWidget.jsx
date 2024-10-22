import React from 'react'

const CartWidget = ({valor}) => {
  return (
    <div>Cart: 
        <span> {valor}</span>
    </div>
  )
}

export default CartWidget