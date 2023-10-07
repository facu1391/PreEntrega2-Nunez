import React from 'react';
import {useCartContext} from '../../Context/CartContext';

export const CartWidget = () => {
  const {totalProducts, cart} = useCartContext();
  const handleClick = () => {
    console.log('Botón del carrito clickeado');
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      <i className="bi bi-cart4"></i>
      <span>{totalProducts() ||cart}</span>
    </button>
  );
}

export default CartWidget;







