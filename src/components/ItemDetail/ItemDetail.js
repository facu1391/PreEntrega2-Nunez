import React, {useState} from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../Context/CartContext';

const ItemDetail = ({item}) => {
   
  const[goToCart, setGoToCart] = useState(false);
  const {addProduct} = useCartContext()
  const onAdd = (quantity) =>{
   setGoToCart(true);
   addProduct(item, quantity);
  }

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
        {goToCart ? (
          <Link to='/cart' className="btn btn-primary">Terminar compra</Link>
        ) : (
          <ItemCount stock={10} initial={0} onAdd={onAdd} />
        )}
      </div>
   </div>
  )
}

export default ItemDetail;