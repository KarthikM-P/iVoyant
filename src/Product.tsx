import React, { useState } from 'react'
import data from './data.json'
const Product = () => {
    const [productData, setProductData] = useState(data)
   
   


  return (
    <div>
        <select name="category" onChange={(e) => e.target.value === 'all'? setProductData(data): setProductData(data.filter((product) => product.category === e.target.value))}>
            <option value='all'>none</option>
            <option value="Electronics">Electronics</option>
            <option value="Shoes">Shoes</option>
            <option value="Gaming">gaming</option>
        </select>

        <select name="" id="" onChange={(e)=>setProductData([...productData].sort((a,b) => e.target.value === 'low' ? a.price - b.price : b.price -a.price ))}>
            <option value="low">Low price</option>
            <option value="high">High price</option>
        </select>

        <select name="" id="" onChange={(e)=>e.target.value === 'allrating' ? setProductData(data)
                                        : e.target.value === 'one' ? setProductData(data.filter((prod) => prod.rating <= 1))
                                        : e.target.value === 'three' ? setProductData(data.filter((prod) => prod.rating <= 3)) 
                                        : setProductData(data.filter((prod) => prod.rating <= 5))}>
            <option value="allrating">no rating</option>
            <option value="one">Less than 1</option>
            <option value="three">Less than 3</option>
            <option value="five">less than = five</option>
        </select>
        

        <h1>Product</h1>
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {productData.map((product) => (
           <div key={product.id} style={{border: "1px solid black", borderRadius: "10px", padding: "10px", margin: "10px"}}>
                <h2>{product.name}</h2>
                <h3>cagegory-{product.category}</h3>
                <p>price:{product.price}</p>
                <p>Rating:{product.rating}</p>
                
           </div>
       ))}
        </div>
       
    </div>
  )
}

export default Product