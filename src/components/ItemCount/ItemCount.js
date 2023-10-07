import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ItemCount = ({ initial, stock, onAdd }) => {
  const [count, setCount] = useState(parseInt(initial));

  const decrease = () => {
    setCount(count - 1);
  };

  const increase = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    setCount(parseInt(initial));
  }, [initial]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-2">
          <button
            className="btn btn-secondary"
            disabled={count <= 1}
            onClick={decrease}
          >
            -
          </button>
        </div>
        <div className="col-2">
          <span>{count}</span>
        </div>
        <div className="col-2">
          <button
            className="btn btn-secondary"
            disabled={count >= stock}
            onClick={increase}
          >
            +
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6 mt-2">
          <button
            className="btn btn-primary"
            disabled={stock <= 0}
            onClick={() => onAdd(count)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCount;