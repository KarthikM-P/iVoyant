import { useState, useLayoutEffect, useRef } from "react";

function Scenerio21() {
  const [width, setWidth] = useState(0);
  const divRef = useRef(null);

  useLayoutEffect(() => {
    setWidth(divRef.current.offsetWidth);
  }, []);

  return <div ref={divRef}>Width: {width}px</div>;
}

export default Scenerio21;
