import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../../data/products';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const { id } = useParams(); // Obtén el id de la URL
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    console.log('ID del producto:', id);
    const fetchProduct = new Promise((resolve) => {
      setTimeout(() => {
        const foundProduct = mockProducts.find((item) => item.id === parseInt(id, 10)); // Asegúrate de comparar como número
        resolve(foundProduct);
      }, 1000);
    });

    fetchProduct
      .then((data) => {
        setProduct(data);
        setLoading(false); // Finaliza la carga
      })
      .catch((error) => {
        console.error('Error al cargar el producto:', error);
        setLoading(false); 
      });
  }, [id]);

  if (loading) {
    return <div>Cargando producto...</div>;
  }

  if (!product) {
    return <div>Producto no encontrado.</div>; 
  }

  return (
    <div className="item-detail-container">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
      <button className="add-to-cart">Agregar al carrito</button>
    </div>
  );
};

export default ItemDetailContainer;
