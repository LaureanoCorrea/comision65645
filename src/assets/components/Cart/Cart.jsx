import './Cart.css';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const { cart, removeFromCart, clearCart, updateQuantity, totalPrice } =
		useCart();
	const navigate = useNavigate();

	const handleProceedToCheckout = () => {
		if (cart.length === 0) {
			alert('El carrito está vacío. Agrega productos para continuar.');
			return;
		}

		const isValid = cart.every((item) => item.quantity > 0);
		if (!isValid) {
			alert('Verifica que las cantidades sean mayores a 0.');
			return;
		}

		navigate('/checkout', { state: { cart, totalPrice } });
	};

	if (cart.length === 0) {
		return <h2>El carrito está vacío.</h2>;
	}

	const handleQuantityChange = (id, value) => {
		updateQuantity(id, Math.max(1, value));
	};

	const handleQuantityIncrement = (id, currentQuantity) => {
		updateQuantity(id, currentQuantity + 1);
	};

	const handleQuantityDecrement = (id, currentQuantity) => {
		if (currentQuantity > 1) {
			updateQuantity(id, currentQuantity - 1);
		}
	};

	return (
		<div className='cart-container'>
			<h2>Carrito de Compras</h2>
			<ul className='cart-items'>
				{cart.map((item) => (
					<li
						key={item.id}
						className='cart-item'
					>
						<div className='cart-item-details'>
							<img
								src={item.image}
								alt={item.name}
								className='cart-item-image'
							/>
							<div className='cart-item-info'>
								<p className='cart-item-name'>{item.title}</p>
								<p className='cart-item-price'>${item.price}</p>
							</div>
						</div>

						<div className='cart-item-controls'>
							<div className='cart-item-quantity'>
								<button
									className='quantity-button'
									onClick={() =>
										handleQuantityDecrement(item.id, item.quantity)
									}
								>
									-
								</button>
								<input
									type='number'
									value={item.quantity}
									onChange={(e) =>
										handleQuantityChange(item.id, Number(e.target.value))
									}
									min='1'
									className='quantity-input'
								/>
								<button
									className='quantity-button'
									onClick={() =>
										handleQuantityIncrement(item.id, item.quantity)
									}
								>
									+
								</button>
							</div>

							<p className='cart-item-stock'>Stock disponible: {item.stock}</p>

							<p className='cart-item-total'>
								Subtotal: ${(item.price * item.quantity).toFixed(2)}
							</p>

							<button
								className='remove-button'
								onClick={() => removeFromCart(item.id)}
							>
								Eliminar
							</button>
						</div>
					</li>
				))}
			</ul>

			<div className='cart-summary'>
				<h3>Total: ${totalPrice.toFixed(2)}</h3>
				<button
					className='clear-cart'
					onClick={clearCart}
				>
					Vaciar Carrito
				</button>
				<button
					className='checkout-button'
					onClick={handleProceedToCheckout}
				>
					Proceder a la compra
				</button>
			</div>
		</div>
	);
};

export default Cart;
