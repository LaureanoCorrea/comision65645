import React from 'react'
import CartWidget from '../CartWidget/CartWidget'

const NavBar = ({valor}) => {
  return (
    <div>
        <h1>Bienvenidos a la tienda</h1>
        <CartWidget valor={valor} />
    </div>
  )
}

export default NavBar