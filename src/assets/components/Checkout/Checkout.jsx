import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { sendBuyOrder } from '../../firebase/firebase';

import './Checkout.css';
import OffCanvas from '../OffCanvas/OffCanvas';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
	const { cart, totalPrice, clearPurchasedItems } = useCart();
	const [buyer, setBuyer] = useState({ name: '', email: '', tel: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [orderId, setOrderId] = useState(null);
	const [showOffcanvas, setShowOffcanvas] = useState(false);
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setBuyer((prevBuyer) => ({ ...prevBuyer, [name]: value }));
	};

	const handleCloseOffCanvas = () => {
		setShowOffcanvas(false);
		clearPurchasedItems();
		navigate('/');
	};

	const handlePlaceOrder = () => {
		if (!buyer.name || !buyer.email || !buyer.tel) {
			alert('Por favor, completa todos los campos del formulario.');
			return;
		}

		const validatedItems = cart.filter(
			(item) => item.title && item.price && item.quantity
		);

		if (validatedItems.length !== cart.length) {
			alert('Algunos productos tienen datos incompletos. Verifica el carrito.');
			return;
		}

		setIsLoading(true);

		const newOrder = {
			buyer,
			date: new Date(),
			items: validatedItems.map((item) => ({
				id: item.id,
				title: item.title,
				price: item.price,
				quantity: item.quantity,
			})),
			total: totalPrice,
		};

		sendBuyOrder(newOrder)
			.then((id) => {
				setOrderId(id);
				setIsLoading(false);
				setShowOffcanvas(true);
			})
			.catch((error) => {
				console.error('Error al enviar la orden:', error);
				setIsLoading(false);
			});
	};

	if (!cart || cart.length === 0) {
		return <h2>No hay productos en el carrito.</h2>;
	}

	return (
		<div className='checkout-container'>
			<h2>Resumen de tu pedido</h2>
			<ul className='checkout-items'>
				{cart.map((item) => (
					<li
						key={item.id}
						className='checkout-item'
					>
						<img
							src={item.image}
							alt={item.title}
							className='checkout-item-image'
						/>
						<div>
							<p>{item.title}</p>
							<p>Cantidad: {item.quantity}</p>
							<p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
						</div>
					</li>
				))}
			</ul>
			<h3>Total a pagar: ${totalPrice.toFixed(2)}</h3>

			<form className='buyer-form'>
				<label>
					Nombre:
					<input
						type='text'
						name='name'
						value={buyer.name}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Email:
					<input
						type='email'
						name='email'
						value={buyer.email}
						onChange={handleInputChange}
						required
					/>
				</label>
				<label>
					Teléfono:
					<input
						type='tel'
						name='tel'
						value={buyer.tel}
						onChange={handleInputChange}
						required
					/>
				</label>
			</form>

			<button
				onClick={handlePlaceOrder}
				className='place-order-button'
				disabled={isLoading}
			>
				{isLoading ? <div className='spinner'></div> : 'Realizar Pedido'}
			</button>

			{showOffcanvas && (
				<OffCanvas
					isVisible={showOffcanvas}
					onClose={handleCloseOffCanvas}
					orderId={orderId}
				/>
			)}
		</div>
	);
};

export default Checkout;
