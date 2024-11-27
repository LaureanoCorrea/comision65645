import './App.css';
import NavBar from './assets/components/NavBar/NavBar';
import ItemListContainer from './assets/components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './assets/components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [valor, setValor] = useState(0);

  return (
    <Router>
      <NavBar valor={valor} />
      <Routes>
        <Route exact path="/" element={<ItemListContainer mensaje="Bienvenido" fn={setValor} />} />
        <Route exact path="/category/:category" element={<ItemListContainer mensaje="Filtrando por categoría" fn={setValor} />} />
        <Route exact path="/product/:id" element={<ItemDetailContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
