import { useEffect, useState } from 'react'

// You have the following code that increments a counter every second, but it always prints 0 in the console. Why? How do you fix it?
// function Counter() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setInterval(() => {
//       console.log(count);
//       setCount(count + 1);
//     }, 1000);
//   }, []);

//   return <p>Count: {count}</p>;
// }

const Scenerio1 = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count =>{
        console.log(count+1)
        return count + 1;
      } )
        
      
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  )
}

export default Scenerio1