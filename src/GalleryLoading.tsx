import React, { useEffect, useRef } from 'react'

const GalleryLoading = ({images, Fetchimage}) => {
    const observerRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) images.push(...images);
          },
          { threshold: 1.0 }
        );
    
        if (observerRef.current) observer.observe(observerRef.current);
    
        return () => observer.disconnect();
      }, []);

      console.log(images);
      
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Infinite Scroll Gallery</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {images.map((img) => (
            <img
                key={img.id}
                src={img.download_url}
                alt="Random"
                loading="lazy"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            ))}
        </div>

        <div ref={observerRef} style={{ margin: "20px 0" }}>
            <p>Loading more images...</p>
        </div>
    </div>
  )
}

export default GalleryLoading