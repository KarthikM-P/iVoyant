// Your e-commerce app has a shopping cart that needs to support adding, removing, and updating quantities. 
// How would you refactor the following to use useReducer?

import { useReducer,  } from 'react'

const Scenerio2 = () => {
    const cartReducer = (state, action) => {
        switch (action.type) {
          case "ADD_ITEM":
            return [...state, action.payload];
          case "REMOVE_ITEM":
            return state.filter(item => item.id !== action.payload);
          default:
            return state;
        }
      };
      
      
        const [cart, dispatch] = useReducer(cartReducer, []);
      
        const addItem = item => dispatch({ type: "ADD_ITEM", payload: item });
        const removeItem = id => dispatch({ type: "REMOVE_ITEM", payload: id });
      
        return <div>
          {cart.map(item => <p key={item.id}>{item.name}</p>)}
          <button onClick={() => addItem({ id: Date.now(), name: "Item1" })}>Add Item</button>
          <button onClick={() => removeItem(Date.now())}>Remove Item</button>
          </div>;
      
       
} 

export default Scenerio2