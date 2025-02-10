import { useState } from 'react';
import products from './product.json';

const Products = () => {
  const [productinfo, setProductInfo] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredProducts = products.filter((product) =>
      product.category.toLowerCase().includes(value)
    );

    setProductInfo(filteredProducts);
  };

  return (
    <div>
      <h1>Products</h1>
      <input type="text" onChange={search} placeholder="Search by category" />
      <h1>{searchTerm}</h1>
        {productinfo.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))
      }
    </div>
  );
};

export default Products;
