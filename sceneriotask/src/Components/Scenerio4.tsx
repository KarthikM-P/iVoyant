// The following component updates state on every render, causing an infinite loop. How do you fix it?
import React, { useState, useEffect } from "react";


const fetchUserName = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve("John Doe"), 1000) 
  );
};

const Scenerio4 = () => {
  const [name, setName] = useState("Loading...");

  useEffect(() => {
    let isMounted = true;

    async function getUser() {
      try {
        const userName = await fetchUserName();
        if (isMounted) {
          setName(userName); 
        }
      } catch (error) {
        if (isMounted) {
          setName("Error fetching user");
        }
      }
    }

    getUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return <p>User: {name}</p>;
};

export default Scenerio4;
