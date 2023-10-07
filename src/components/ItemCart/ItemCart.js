import React from 'react';
import { useCartContext } from '../../Context/CartContext';

const ItemCart = ({ product }) => {
  const { removeProduct } = useCartContext();
  return (
    <div className='card mb-3'>
      <div className='row g-0'>
        <div className='col-md-4'>
          <img src={product.img} alt={product.title} className='img-fluid' />
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>Título: {product.title}</h5>
            <p className='card-text'>Cantidad: {product.quantity}</p>
            <p className='card-text'>Precio unitario: $ {product.price}</p>
            <p className='card-text'>Subtotal: ${product.quantity * product.price}</p>
            <button
              onClick={() => removeProduct(product.id)}
              className='btn btn-danger'
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;