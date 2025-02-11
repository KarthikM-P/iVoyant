import  { useState } from 'react'

const Todolist = () => {
    const [lst, setlst] = useState(['start']);
    const [data, setdata] = useState('')
    function update(){
        setlst([...lst, data]);
        setdata('')
    }
  return (
    <div>
        <h1>TODO LIST</h1>
        <input type="text" value={data} onChange={(e)=>{setdata(e.target.value)}} />
        <ul>
            {lst.map((list, index)=>(
                <li key={index}>{list}</li>
            ))}
        </ul>
        <button onClick={update}>add</button>
    </div>
  )
}

export default Todolist