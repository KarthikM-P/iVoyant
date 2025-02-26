// import React from 'react'

import { useReducer, useState } from "react"
const Reducer = () => {

const initialstate = []

function Reducer(state, action){
    switch(action.type){
        case "add_todo":
            return [...state, { id: Date.now(), todo: action.payload }]
        case "remove_todo":
            return state.filter((todo) => todo.id !== action.payload.id)
              
        case "clear_todo":
            return state=[] 
    }
}
    const [state, dispatch] = useReducer(Reducer, initialstate)
    const [inputs,setinputs] = useState('');

    function addinput(e){
        setinputs(e.target.value)
    }

    function addTodo() {
        dispatch({ type: "add_todo", payload:  inputs  });
        setinputs("");
      }
  return (
    <div>
       <input type="text" value={inputs} onChange={addinput} />
       <button onClick={addTodo}>add</button>
       {state.map((todoe,id)=>(
        <ul key={id}>
            <li>
                {todoe.todo}
                <button onClick={()=>{
                    dispatch({type:"remove_todo", payload:{id:todoe.id}})
                }}>remove</button>
            </li>
        </ul>
       ))} 
       <button onClick={()=>{dispatch({type:"clear_todo"})}}>clear</button>
    </div>
  )
}

export default Reducer