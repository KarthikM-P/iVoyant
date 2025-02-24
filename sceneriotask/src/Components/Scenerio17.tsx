import { useState, useEffect } from "react";

function Scenerio17({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let active = true;

    fetch(`https://api.example.com/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (active) setUser(data);
      });

    return () => (active = false);
  }, [userId]);

  return <p>{user?.name || "Loading..."}</p>;
}

export default Scenerio17;
