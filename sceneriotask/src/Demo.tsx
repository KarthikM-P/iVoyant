/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useReducer } from 'react'

const Demo = () => {

    const initialState = {
        name:''
    }
type reducerprops = {
  name:string,
 
}
    function reducer(state:reducerprops, action:any) {
        switch (action.type) {
          case 'SET_NAME':
            return { ...state, name: action.payload };
          default:
            return state;
        }
      }


    const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
        <h1>{state.name}</h1>
        <input type="text" value={state.name} onChange={(e)=>dispatch({type:'SET_NAME', payload:e.target.value})} />
        <button onClick={()=>dispatch({type:'SET_NAME',})}>view</button>
        <button onMouseEnter={()=>dispatch({type:'SET_NAME', payload:" "})}>reset</button>
    </div>
  )
}

export default Demo