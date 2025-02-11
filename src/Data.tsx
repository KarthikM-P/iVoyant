import { useState, useEffect } from 'react';

const FetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []); 

  return (
    <div>
      <h1>Products</h1>
      {data.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}
    </div>
  );
};

export default FetchData;
