import  { useState } from 'react'

const Toggle = () => {
    const [toggle, settoggle] = useState(false)
  return (
    <div>
        <h1>switch toggle</h1>
        <button onClick={()=>settoggle(!toggle)}>
            {toggle?"Turnoff":"Turnon"}
        </button>
        <p>the button is {toggle?"on":"off"}</p>
    </div>
  )
}

export default Toggle