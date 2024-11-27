import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockProducts } from "../../data/products";

const ItemListContainer = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Categoría seleccionada:", category);
    const fetchProducts = new Promise((resolve) => {
      setTimeout(() => {
        if (category) {
          // Filtra productos por categoría
          const filteredProducts = mockProducts.filter(
            (item) => item.category === category
          );
          resolve(filteredProducts);
        } else {
          // Devuelve todos los productos
          resolve(mockProducts);
        }
      }, 1000);
    });

    fetchProducts
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (products.length === 0) {
    return <div>No hay productos en esta categoría.</div>;
  }

  return (
    <div className="item-list-container">
      <h2>{category ? `Productos de ${category}` : "Todos los productos"}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />{" "}
            <p>Precio: ${product.price.toFixed(2)}</p>
            <Link to={`/product/${product.id}`}>Ver detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemListContainer;
