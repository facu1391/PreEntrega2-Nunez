import { useState } from 'react';
import { useCartContext } from '../../Context/CartContext';

import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore';

export const Checkout = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmacion, setEmailConfirmacion] = useState('');
  const [error, setError] = useState('');
  const [ordenId, setOrdenId] = useState('');
  const [mensaje, setMensaje] = useState('');

  const { cart, removeProduct, totalPrice } = useCartContext();

  const manejadorFormulario = (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (email !== emailConfirmacion) {
      setError('Los campos de email no coinciden');
      return;
    }
    const total = totalPrice();
    const orden = {
      items: cart.map((producto) => ({
        id: producto.id,
        nombre: producto.title,
        cantidad: producto.quantity,
      })),
      total: total,
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email,
    };

    Promise.all(
      orden.items.map(async (productoOrden) => {
        const db = getFirestore();
        const productoRef = doc(db, 'products', productoOrden.id);

        const productoDoc = await getDoc(productoRef);
        const stockActual = productoDoc.data().stock;

        await updateDoc(productoRef, {
          stock: stockActual - productoOrden.cantidad,
        });
      })
    )
      .then(() => {
        const db = getFirestore();
        addDoc(collection(db, 'orders'), orden)
          .then((docRef) => {
            setOrdenId(docRef.id);
            removeProduct();
          })
          .catch((error) => {
            console.log('Error en creacon de orden', error);
            setError('Error en orden');
          });
      })
      .catch((error) => {
        console.log('No se puede actualizar el stock', error);
        setError('No se actualizo el stock');
      });

    setNombre('');
    setApellido('');
    setTelefono('');
    setEmail('');
    setEmailConfirmacion('');
    setMensaje('');
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center align-items-center">
      <div className="col-md-8">
        <h2 className="info">
        Rellena el formulario y nos contactaremos para enviar sus productos
        </h2>

        <form onSubmit={manejadorFormulario}>
          {cart.map((producto) => (
            <div className="item-check" key={producto.id}>
              <p>
                {producto.nombre} {producto.cantidad}
              </p>
              <p>{producto.precio}</p>
            </div>
          ))}

          <div className="form-group">
            <label className="lab-check">Nombre</label>
            <input
              className="form-control"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="lab-check">Apellido</label>
            <input
              className="form-control"
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="lab-check">Telefono</label>
            <input
              className="form-control"
              type="number"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="lab-check">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="lab-check">Email de Confirmación</label>
            <input
              className="form-control"
              type="email"
              value={emailConfirmacion}
              onChange={(e) => setEmailConfirmacion(e.target.value)}
            />
          </div>

          {error && <p className="error-campos">{error}</p>}

          {ordenId && (
            <p className="orden">
              ¡Gracias por tu compra! <br /> Este es tu número de orden: <br />
              {ordenId}
            </p>
          )}

          <div className="checking">
            <button className="btn btn-primary mb-3" type="submit">
              Finalizar Compra
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
 );
};

export default Checkout;