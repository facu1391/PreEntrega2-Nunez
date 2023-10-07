import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../Context/CartContext';
import ItemCart from '../ItemCart/ItemCart';

const Cart = () => {
  const { cart, totalPrice } = useCartContext();

  if (cart.length === 0) {
    return (
        <div className="container text-center mt-5 mb-5">
          <p className="h2">No hay elementos en el carrito</p>
          <Link to="/" className="btn btn-primary mt-3">Hacer compras</Link>
        </div>
    );
  }

  return (
    <div className="container mt-5">
      {cart.map((product) => (
        <ItemCart key={product.id} product={product} />
      ))}
      <p className="h4">Total: $ {totalPrice()}</p>

      <Link to="/checkout">
        <button className="btn btn-success">Finalizar Compra</button>
      </Link>
    </div>
  );
};

export default Cart;