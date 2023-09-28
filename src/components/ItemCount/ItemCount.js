import React, { useState } from "react";

const ItemCount = ({ stockItems }) => {
  const [counter, setCounter] = useState(1);
  const [stock, setStock] = useState(stockItems);

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
          <button type="button" className="btn btn-primary">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCount;
