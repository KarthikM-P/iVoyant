import React from 'react'

interface data {
    username: string,
    age: number
}
const Child:React.FC<data> = ({username, age}) => {

  return (
    <div>
        <h1>Hello,</h1>
        <p>My name is {username} and I am {age} years old</p>
    </div>
  )
}

export default Child