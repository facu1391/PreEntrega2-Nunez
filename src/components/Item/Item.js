import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
  return (
    <Link to={`/item/${item.id}`} className='text-decoration-none'>
      <div className='container'>
        <div className='card border-3' style={{ width: '20rem' }}>
          <img src={item.imagen} className='card-img-top' alt={item.nombre} />
          <div className='card-body text-center'>
            <h5 className='card-title'>{item.nombre}</h5>
            <p className='card-text'>{item.descripcion}</p>
            <p className='card-text'>${item.precio}</p>
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

