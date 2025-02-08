import React from 'react'
import { appprops } from './App'
import ComponentD from './ComponentD'
const ComponentC:React.FC<appprops> = ({name}) => {
  return (
    <div>
        <ComponentD name = {name}/>
    </div>
  )
}

export default ComponentC