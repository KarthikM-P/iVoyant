import { useEffect } from "react";

function Scenerio9() {
  useEffect(() => {
    const handleResize = () => console.log("Resized!");

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <p>Resize the window to see logs!</p>;
}

export default Scenerio9;
