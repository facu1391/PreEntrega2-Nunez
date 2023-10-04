import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
  return (
    <Link to={`/item/${item.id}`} className='text-decoration-none'>
      <div className='container'>
        <div className='card border-3' style={{ width: '20rem' }}>
          <img src={item.img} className='card-img-top' alt={item.title} />
          <div className='card-body text-center'>
            <h5 className='card-title'>{item.title}</h5>
            <p className='card-text'>{item.description}</p>
            <p className='card-text'>${item.price}</p>
          </div>
          <div className='card-footer'>
            <button className='btn btn-primary'>Agregar al carrito</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;

