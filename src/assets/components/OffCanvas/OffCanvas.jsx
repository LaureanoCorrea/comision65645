import './OffCanvas.css';

const OffCanvas = ({ product, isVisible, onClose, onGoToCart, orderId }) => {
	if (!isVisible) return null;

	return (
		<div className='offcanvas-container'>
			<div
				className='offcanvas-overlay'
				onClick={onClose}
			></div>
			<div className='offcanvas-content'>
				{orderId ? (
					<>
						<h3>¡Compra realizada con éxito!</h3>
						<p>Tu ID de orden es:</p>
						<h4>{orderId}</h4>
						<p>Gracias por tu compra.</p>
						<div className='offcanvas-buttons'>
							<button onClick={onClose}>Cerrar</button>
						</div>
					</>
				) : (
					<>
						<h3>¡Producto agregado al carrito!</h3>
						<img
							src={product.image}
							alt={product.name}
						/>
						<p>{product.name}</p>
						<p>Precio: ${product.price.toFixed(2)}</p>
						<div className='offcanvas-buttons'>
							<button onClick={onGoToCart}>Ir al carrito</button>
							<button onClick={onClose}>Cerrar</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default OffCanvas;
