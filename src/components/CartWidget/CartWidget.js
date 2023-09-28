import React from 'react';

export const CartWidget = () => {
  const handleClick = () => {
    console.log('Botón del carrito clickeado');
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      <i className="bi bi-cart4"></i>
      <span>0</span>
    </button>
  );
}

export default CartWidget;







