import { useRef, forwardRef, useImperativeHandle } from "react";

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current.focus(),
  }));

  return <input ref={inputRef} type="text" />;
});

function Scenerio16() {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focusInput()}>Focus Input</button>
    </div>
  );
}

export default Scenerio16;
