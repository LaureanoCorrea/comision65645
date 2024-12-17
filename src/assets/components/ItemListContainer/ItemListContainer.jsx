import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProducts, getProductsByCategory } from '../../firebase/firebase';
import Card from '../Card/Card';
import './ItemListContainer.css';

const ItemListContainer = () => {
	const { category } = useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		if (category) {
			getProductsByCategory(category)
				.then((filteredProducts) => {
					setProducts(filteredProducts);
				})
				.catch((error) => {
					console.error('Error al cargar productos por categoría:', error);
				})
				.finally(() => setLoading(false));
		} else {
			getAllProducts()
				.then((allProducts) => {
					setProducts(allProducts);
				})
				.catch((error) => {
					console.error('Error al cargar todos los productos:', error);
				})
				.finally(() => setLoading(false));
		}
	}, [category]);

	if (loading) {
		return <div>Cargando productos...</div>;
	}

	if (products.length === 0) {
		return (
			<div>
				No hay productos disponibles{' '}
				{category ? `en la categoría ${category}` : ''}.
			</div>
		);
	}

	return (
		<div>
			<h2>{category ? `Productos de ${category}` : 'Todos los productos'}</h2>
			<div className='item-list-container'>
				<div className='item-list'>
					{products.map((product) => (
						<Card
							key={product.id}
							id={product.id}
							image={product.image}
							name={product.title}
							price={product.price}
							actionLabel='Ver detalles'
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ItemListContainer;
