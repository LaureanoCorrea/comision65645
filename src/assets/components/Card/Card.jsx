import { useNavigate } from 'react-router-dom';
import './Card.css';
import { useCart } from '../../context/CartContext';

const Card = ({
	id,
	image,
	name,
	price,
	description,
	quantity,
	actionLabel,
}) => {
	const navigate = useNavigate();
	const { addToCart } = useCart();

	const handleAction = () => {
		addToCart({ id, name, price, image, quantity });
		navigate(`/product/${id}`);
	};
	return (
		<div className='card'>
			<img
				src={image}
				alt={name}
				className='card__image'
			/>
			<div className='card__content'>
				<h3 className='card__title'>{name}</h3>
				{price && <p className='card__price'>Precio: ${price.toFixed(2)}</p>}
				{description && <p className='card__description'>{description}</p>}
				{quantity && <p className='card__quantity'>Cantidad: {quantity}</p>}
				<button
					className='card__button'
					onClick={handleAction}
				>
					{actionLabel || 'Acción'}
				</button>
			</div>
		</div>
	);
};

export default Card;
