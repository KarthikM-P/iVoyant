import React from 'react'
import { Users } from './App'

const Child2:React.FC<Users> = ({name,age,address}) => {
  return (
    <div>
       <h1>Hello from Child2</h1>
        <h2>{name}</h2>
        <p>{age}</p>
        <p>{address}</p> 
    </div>
  )
}

export default Child2