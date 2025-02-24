import { useCallback, useEffect, useState } from "react";

function Scenerio20() {
  const [key, setKey] = useState("");

  const logKey = useCallback((e) => {
    setKey(e.key);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", logKey);
    return () => window.removeEventListener("keydown", logKey);
  }, [logKey]);

  return <p>Last Key Pressed: {key}</p>;
}

export default Scenerio20;
