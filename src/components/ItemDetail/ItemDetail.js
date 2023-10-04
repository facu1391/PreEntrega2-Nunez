import React from 'react'
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';

const ItemDetail = ({item}) => {
  return (
    <div className="card mx-auto mt-5">
      <div className='col-md-4 offset-md-4'>
         <img src={item.img} className='card-img-top'alt={item.title}/>
         <h2 className="card-title">{item.title}</h2>
         <p className="card-text">{item.description}</p>
         <p className="card-text"> ${item.price}</p>
         <p className="card-text"> Cantidad: {item.stock}</p>
      </div>
      <div className="card-footer">
         <ItemCount stockItems={10}/>
      </div>
   </div>
  )
}

export default ItemDetail;