import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path={"/"} element={ <ItemListContainer greeting={'Bienvenidos a nuestra tienda'} />} />
          <Route path={"/category/:id"} element={<ItemListContainer/>} />
          <Route path={"/item/:id"} element={<ItemDetailContainer />} />
          <Route  path={"*"} element={<h1>404 NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
