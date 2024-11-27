import React from "react";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";
import './NavBar.css'

const NavBar = ({ valor }) => {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <h1>Bienvenidos a la tienda</h1>
      </div>
      <ul className="navbar__menu">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/category/electronica">Electrónica</Link>
        </li>
        <li>
          <Link to="/category/ropa">Ropa</Link>
        </li>
        <li>
          <Link to="/category/juguetes">Juguetes</Link>
        </li>
      </ul>
      <CartWidget valor={valor} />
    </nav>
  );
};

export default NavBar;
