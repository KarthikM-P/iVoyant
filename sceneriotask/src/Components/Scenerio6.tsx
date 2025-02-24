import { useState, useEffect } from "react";

function Scenerio6({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`https://api.example.com/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) setUser(data);
      });

    return () => (isMounted = false);
  }, [userId]);

  return <p>{user?.name || "Loading..."}</p>;
}

export default Scenerio6;
