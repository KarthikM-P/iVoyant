import { useState } from 'react'

const Names = () => {
    const names = ['raj','suresh','arun','bhuvan']
    const [data, setdata] = useState('')
    function handle (){
        let i;
        for(i=0;i<names.length;i++){
           setdata(names[i]); 
        }
    }
  return (
    <div>
        <h1>NAMES - {data}</h1>
        <button onClick={handle}>change</button>
    </div>
  )
}

export default Names