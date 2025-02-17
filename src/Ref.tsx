import React, { useRef } from 'react'

const Ref = () => {
    const myref = useRef(0);
    function myfnc(){
        myref.current +=1
    }
  return (
    <div>
       <h1>{myref.current}</h1>
        <button onClick={myfnc}>increase</button>
    </div>
  )
}

export default Ref