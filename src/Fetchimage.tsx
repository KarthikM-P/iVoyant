import { useEffect, useState } from 'react'
import GalleryLoading from './GalleryLoading'

const Fetchimage = () => {
    const [imageData, setImageData] = useState()
    const fetchimg = useEffect(()=>{
        fetch("https://picsum.photos/v2/list?page=${page}&limit=100")
        .then((res)=>res.json())
        .then((data)=>setImageData(data))
    },[])
    console.log(imageData);
    
  return (
    <div>
        <GalleryLoading images={imageData} fetchImage={fetchimg}/>
    </div>
  )
}

export default Fetchimage