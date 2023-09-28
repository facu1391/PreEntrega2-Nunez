import React from 'react'
import ItemCount from '../ItemCount/ItemCount';

const ItemDetail = ({item}) => {
  return (
    <div className="card mx-auto mt-5">
      <div className='col-md-4 offset-md-4'>
         <img src={item.imagen} className='card-img-top'alt={item.nombre}/>
         <h2 className="card-title">{item.nombre}</h2>
         <p className="card-text">{item.descripcion}</p>
         <p className="card-text"> $ {item.precio}</p>
         <p className="card-text"> Cantidad: {item.stock}</p>
      </div>
      <div className="card-footer">
         <ItemCount stockItems={10}/>
      </div>
   </div>
  )
}

export default ItemDetail;