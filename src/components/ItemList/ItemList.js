import React from 'react';
import Item from '../Item/Item';

const ItemList = ({ item }) => {

  return (
    <div className='row'>
        {
        item.map(item=>
        <div className='col-md-4 mb-4'
        key={item.id}>
        <Item item={item}/> 
        </div>
        )   
        }
    </div>
  );
};

export default ItemList;