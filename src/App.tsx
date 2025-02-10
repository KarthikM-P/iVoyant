// import React from 'react'

import Child1 from "./Child1"
import Child2 from "./Child2"

export type Users = {
  name: string
  age: number
  address: string
}

const personaldetail:Users = {
  name:'xyz',
  age:23,
  address:'abc'
}

const App = () => {
  return (
    <>
      <Child1 user = {personaldetail} />
      <Child2 {...personaldetail} />
   
    </>
  )
}

export default App