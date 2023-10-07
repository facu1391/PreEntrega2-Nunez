import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import CartProvider from '../src/Context/CartContext';
import Cart from "./components/Cart/Cart";
import {Checkout} from '../src/components/Checkout/Checkout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
            <NavBar />
            <Routes>
              <Route path={"/"} element={ <ItemListContainer greeting={'Bienvenidos a nuestra tienda'} />} />
              <Route path={"/category/:id"} element={<ItemListContainer/>} />
              <Route path={"/item/:id"} element={<ItemDetailContainer />} />
              <Route path={"/cart"} element={<Cart/>} />
              <Route path={"/checkout"} element={<Checkout/>} />
              <Route  path={"*"} element={<h1>404 NOT FOUND</h1>} />
            </Routes>
          </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
