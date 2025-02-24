// You need to calculate the total price whenever items in the cart change.
//  However, your totalPrice state is not updating correctly. What’s wrong with this approach?
import { useState, useEffect } from "react";

const Scenerio3 = () => { 
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, setCart] = useState([]);
    useEffect(() => {
         

            setTotalPrice(cart.reduce((sum, item) => sum + item.price, 0));
        
    }, [cart]);
  
    return (
        <p>Total Price: ${totalPrice}</p>
    );
}

export default Scenerio3;
