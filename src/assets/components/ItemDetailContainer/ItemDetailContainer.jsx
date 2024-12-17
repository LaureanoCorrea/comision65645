import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOneProduct } from '../../firebase/firebase';
import { useCart } from '../../context/CartContext';
import OffCanvas from '../OffCanvas/OffCanvas';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const [isOffCanvasVisible, setIsOffCanvasVisible] = useState(false);

	const { addToCart } = useCart();

	useEffect(() => {
		setLoading(true);
		getOneProduct(id)
			.then((product) => setProduct(product))
			.catch((error) => {
				console.error('Error al cargar el producto:', error);
				setProduct(null);
			})
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <div>Cargando producto...</div>;

	if (!product) return <div>Producto no encontrado.</div>;

	const handleAddToCart = () => {
		addToCart(product, quantity);
		setIsOffCanvasVisible(true);
	};

	const handleCloseOffCanvas = () => {
		setIsOffCanvasVisible(false);
		navigate('/');
	};

	const handleGoToCart = () => {
		setIsOffCanvasVisible(false);
		navigate('/cart');
	};

	return (
		<div className='item-detail-container'>
			<Link
				className='card__button'
				to='/'
			>
				Volver
			</Link>

			<h2>{product.title}</h2>
			<img
				src={product.image}
				alt={product.name}
			/>
			<p>{product.description}</p>
			<p>
				<strong>Precio:</strong> ${product.price.toFixed(2)}
			</p>

			<div className='quantity-selector'>
				<label>
					Cantidad:
					<input
						type='number'
						value={quantity}
						min='1'
						onChange={(e) => setQuantity(Number(e.target.value) || 1)}
					/>
				</label>
			</div>

			<button
				className='add-to-cart'
				onClick={handleAddToCart}
				disabled={quantity < 1}
			>
				Agregar al carrito
			</button>

			<OffCanvas
				product={product}
				isVisible={isOffCanvasVisible}
				onClose={handleCloseOffCanvas}
				onGoToCart={handleGoToCart}
			/>
		</div>
	);
};

export default ItemDetailContainer;
