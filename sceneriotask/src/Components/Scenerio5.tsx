// The following component fetches data, but when switching users quickly, you get a warning:

// "Can't perform a React state update on an unmounted component."
// How would you fix this?


import { useState, useEffect } from "react";

function Scenerio5({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.example.com/user/${userId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(setUser)
      .catch(err => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [userId]);

  return <p>{user?.name || "Loading..."}</p>;
}

export default Scenerio5;
