import { useState } from 'react'

const Userdetail = () => {
    const [prof, setProf] = useState({name:"",age:18})


  return (
    <div>
        <h1>user details</h1>
        <input type="text" value={prof.name} onChange={(e)=>setProf({...prof,name:e.target.value})} placeholder="Enter your name" />
        <p>Your name is: {prof.name}</p>
        <button onClick={()=>setProf({...prof,age:prof.age+1})}>+</button>
        {prof.age}
        <button onClick={()=>setProf({...prof,age:prof.age-1})}>-</button>
    </div>
  )
}

export default Userdetail