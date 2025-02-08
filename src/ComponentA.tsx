import React from 'react'
import ComponentB from './ComponentB'
import { appprops } from './App'
const ComponentA:React.FC<appprops> = ({name}) => {
  return (
    <div>
        <ComponentB name = {name}/>
    </div>
  )
}

export default ComponentA