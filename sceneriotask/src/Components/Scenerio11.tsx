import { useCallback } from "react";

function Scenerio11() {
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return <button onClick={handleClick}>Click Me</button>;
}

export default Scenerio11;
