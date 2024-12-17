import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const addToCart = (product, quantity) => {
		if (isNaN(quantity) || quantity <= 0) return;

		if (!product || !product.id) {
			console.error('Producto inválido:', product);
			return;
		}

		setCart((prevCart) => {
			const existingProduct = prevCart.find((item) => item.id === product.id);

			if (existingProduct) {
				return prevCart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + quantity }
						: item
				);
			} else {
				return [...prevCart, { ...product, quantity }];
			}
		});
	};

	const updateQuantity = (productId, newQuantity) => {
		if (newQuantity < 1) return;
		setCart(
			cart.map((item) =>
				item.id === productId ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	const removeFromCart = (productId) => {
		setCart(cart.filter((item) => item.id !== productId));
	};

	const clearPurchasedItems = () => {
		setCart(cart.filter((item) => item.stock < item.quantity));
	};

	const clearCart = () => setCart([]);

	const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				updateQuantity,
				removeFromCart,
				clearPurchasedItems,
				clearCart,
				totalItems,
				totalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
