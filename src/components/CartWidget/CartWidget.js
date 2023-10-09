import React from 'react';
import { useCartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router

export const CartWidget = () => {
  const {totalProducts, cart} = useCartContext();

  return (
    <div>
        <button className="btn btn-primary">
          <i className="bi bi-cart4"></i>
          <span>{totalProducts() ||cart}</span>
        </button>
    </div>
  );
};

export default CartWidget;







