import React from 'react';
import { useCartContext } from '../../Context/CartContext';

const CartWidget = () => {
  const {totalProducts, cart} = useCartContext();

  return (
    <div>
       <button className="btn btn-primary position-relative">
          <i className="bi bi-cart4"></i>
          <span className={`position-absolute top-0 start-100 translate-middle badge bg-danger ${totalProducts() > 0 ? 'visible' : 'invisible'}`}>
            {totalProducts() || cart}
          </span>
      </button>
    </div>
  );
};

export default CartWidget;







