import React from 'react'
import { appprops } from './App'

const ComponentD:React.FC<appprops>= ({name}) => {
  return (
    <div>
        <h1>Hello {name}</h1>
    </div>
  )
}

export default ComponentD