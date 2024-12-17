import './App.css';
import NavBar from './assets/components/NavBar/NavBar';
import ItemListContainer from './assets/components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './assets/components/ItemDetailContainer/ItemDetailContainer';
import Checkout from './assets/components/Checkout/Checkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Cart from './assets/components/Cart/Cart';
import { CartProvider } from './assets/context/CartContext';

function App() {
	const [valor, setValor] = useState(0);

	return (
		<Router>
			<CartProvider>
				<NavBar valor={valor} />
				<Routes>
					<Route
						exact
						path='/'
						element={
							<ItemListContainer
								mensaje='Bienvenido'
								fn={setValor}
							/>
						}
					/>
					<Route
						exact
						path='/category/:category'
						element={
							<ItemListContainer
								mensaje='Filtrando por categoría'
								fn={setValor}
							/>
						}
					/>
					<Route
						exact
						path='/product/:id'
						element={<ItemDetailContainer />}
					/>
					<Route
						exact
						path='/cart'
						element={<Cart />}
					/>
					<Route
						exact
						path='/checkout'
						element={<Checkout />}
					/>
				</Routes>
			</CartProvider>
		</Router>
	);
}

export default App;
