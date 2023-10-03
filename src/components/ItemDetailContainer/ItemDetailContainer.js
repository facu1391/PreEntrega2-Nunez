import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams solo una vez
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import arrayProductos from '../../Json/arrayProductos.json';
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {
    const [item, setItem] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const promesa = new Promise((resolve) => {
            setTimeout(() => {
                resolve(arrayProductos.find((item) => item.id === parseInt(id)));
            }, 2000);
        });
        promesa.then((data) => {
            setItem(data);
        });
    }, [id]);

    return (
        <div className='container'>
            <ItemDetail item={item} />
        </div>
    );
};

export default ItemDetailContainer;