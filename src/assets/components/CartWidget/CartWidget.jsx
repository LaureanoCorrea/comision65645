import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
	const { totalItems } = useCart();

	return (
		<Link
			to='/cart'
			className='cart-widget'
		>
			🛒
			{totalItems > 0 && <span className='cart-count'>{totalItems}</span>}
		</Link>
	);
};

export default CartWidget;
