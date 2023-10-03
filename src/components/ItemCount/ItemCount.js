import React, { useState, useEffect } from "react";

const ItemCount = ({ stockItems }) => {
  const [counter, setCounter] = useState(1);
  const [stock, setStock] = useState(stockItems);
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Nuevo estado para el mensaje de confirmación

  const incrementarStock = () => {
    if (counter < stock) {
      setCounter(counter + 1);
    }
  };

  const decrementarStock = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const isIncrementDisabled = counter >= stock;
  const isDecrementDisabled = counter <= 1;

  const handleAgregarAlCarrito = () => {
    // Actualizar el mensaje de confirmación
    setConfirmationMessage(`Se agregó ${counter} al carrito`);

    // Restablecer el mensaje después de 2 segundos (puedes ajustar el tiempo según tus necesidades)
    setTimeout(() => {
      setConfirmationMessage("");
    }, 2000);
  };

  return (
    <div>
      <div className="text-center">
        <button
          className={`btn btn-primary ${isDecrementDisabled ? 'disabled' : ''}`}
          onClick={decrementarStock}
          disabled={isDecrementDisabled}
        >
          -
        </button>
        
        <span className="mx-2">{counter}</span>

        <button
          className={`btn btn-primary ${isIncrementDisabled ? 'disabled' : ''}`}
          onClick={incrementarStock}
          disabled={isIncrementDisabled}
        >
          +
        </button>
      </div>

      <div className="row">
        <div className="col-md-2 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAgregarAlCarrito}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Se Mostrar el mensaje de confirmación */}
      {confirmationMessage && (
        <div className="text-center mt-2">
          <p>{confirmationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ItemCount;
