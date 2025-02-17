import { useEffect, useState } from 'react'
import paragraph from './Para.json'



const Time = () => {

    const [newdata, setnewdata] = useState('');
    const randompara = Math.floor(Math.random() * paragraph.paragraphs.length);
    const [usertext, setusertext] = useState('');
    const [xyz, setxyz] = useState(false);  
    useEffect(()=>{
        setnewdata(paragraph.paragraphs[randompara]);
        const inter = setTimeout(() => {
        alert('timeout');
        setxyz(!xyz);
       }, 10000);

       return () => {
        clearTimeout(inter);}
    },[])

    
  return (
    <div>
        <h1>Type checking</h1>
        <p>{newdata}</p>
        <p>{usertext}</p>
        <input type="text" value={usertext} disabled={xyz} onChange={(e)=>{setusertext(e.target.value)}} />
        
    </div>
  )
}

export default Time