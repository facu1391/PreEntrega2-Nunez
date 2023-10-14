import React, { useState } from 'react';
import Confetti from 'react-confetti'; 
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
  const [metodoPago, setMetodoPago] = useState(''); 
  const [error, setError] = useState('');
  const [ordenId, setOrdenId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  console.log(mensaje)

  const { cart, removeProduct, totalPrice } = useCartContext();

  const manejadorFormulario = (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion || !metodoPago) {
      setError('Por favor completa todos los campos, incluyendo el método de pago');
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
      metodoPago,
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
            setShowConfetti(true);
          })
          .catch((error) => {
            console.log('Error en creación de orden', error);
            setError('Error en orden');
          });
      })
      .catch((error) => {
        console.log('No se puede actualizar el stock', error);
        setError('No se actualizó el stock');
      });

    setNombre('');
    setApellido('');
    setTelefono('');
    setEmail('');
    setEmailConfirmacion('');
    setMetodoPago('');
    setMensaje('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="info mt-5">
            Rellena el formulario y nos contactaremos para enviar sus productos
          </h1>

          <form onSubmit={manejadorFormulario} className="my-5">
            {cart.map((producto) => (
              <div className="item-check" key={producto.id}>
                <p>
                  {producto.nombre} {producto.cantidad}
                </p>
                <p>{producto.precio}</p>
              </div>
            ))}

            <div className="form-group">
              <label className="lab-check fs-5">Nombre</label>
              <input
                className="form-control"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="lab-check fs-5">Apellido</label>
              <input
                className="form-control"
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="lab-check fs-5">Telefono</label>
              <input
                className="form-control"
                type="number"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="lab-check fs-5">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="lab-check fs-5">Email de Confirmación</label>
              <input
                className="form-control"
                type="email"
                value={emailConfirmacion}
                onChange={(e) => setEmailConfirmacion(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="lab-check fs-5">Método de Pago</label>
              <select
                className="form-control"
                onChange={(e) => setMetodoPago(e.target.value)}
              >
                <option value="">Selecciona un método de pago</option>
                <option value="transferencia">Transferencia bancaria</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="americanExpress">American Express</option>
                <option value="mercadoPago">Mercado Pago</option>
                <option value="pagoFacil">Pago Fácil</option>
              </select>
            </div>

            {error && (
              <p className="error-campos bg-danger text-white display-6 rounded p-2 mt-3">
                {error}
              </p>
            )}

            {ordenId && (
              <p className="orden text-center mt-4">
              <span className="display-4 mb-4">¡Gracias por tu compra!</span>
              <br />
              <span className="h4">Este es tu número de orden:</span>
              <br />
              <span className="h3 text-dark font-weight-bold">{ordenId}</span>
            </p>
            )}

            <div className="checking">
              <button className="btn btn-primary mb-3 mt-3" type="submit">
                Finalizar Compra
              </button>
            </div>
          </form>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={300}
              recycle={true}
              initialVelocityY={5}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;