import { useState } from 'react';
import { sendBuyOrder } from '../../firebase/firebase';

export default function addBuyOrders() {
	const [orderId, setOrderId] = useState(null);

	const handleclick = () => {
		const newOrder = {
			buyer: {
				email: 'lau@lau.com',
				name: 'laureano',
				tel: '113455546',
			},
			date: new Date(),
			items: [
				{
					id: 1,
					title: 'laptop',
					price: 1000,
				},
			],
			total: 1000,
		};

		sendBuyOrder(newOrder).then((id) => setOrderId(id));
	};

	return (
		<>
			<button onClick={handleclick}>Continuar con la compra</button>
			{orderId && <p>Orden Generada:{orderId}</p>}
		</>
	);
}
