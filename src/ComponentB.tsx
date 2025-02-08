import React from 'react'
import ComponentC from './ComponentC'
import { appprops } from './App'
const ComponentB:React.FC<appprops> = ({name}) => {
  return (
    <div>
        <ComponentC name = {name}/>
    </div>
  )
}

export default ComponentB