import { useState, useEffect } from "react";

function Scenerio25({ userId }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetch(`https://api.example.com/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();

        if (isMounted) {
            setData(result);

        }
      } catch (err) {
        if (isMounted){
            setError(err.message);

        }
      }
    }

    fetchData();

    return () => {
      isMounted = false; 
    };
  }, [userId]);

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  return(
      <p>User: {data.name}</p>
      
  ); 
}

export default Scenerio25;
