// import React from 'react'
import ComponentA from './ComponentA'
export interface appprops{
  name:string
}

const App = () => {
  const name = 'karthik'

  return (
    <>
      <ComponentA name={name}/>
    </>
  )
}

export default App