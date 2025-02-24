import { useReducer } from "react";

const tabReducer = (state, action) => {
  switch (action.type) {
    case "SET_TAB":
      return action.payload;
    default:
      return state;
  }
};

function Scenerio19() {
  const [activeTab, dispatch] = useReducer(tabReducer, "home");

  return (
    <div>
      <button onClick={() => dispatch({ type: "SET_TAB", payload: "home" })}>Home</button>
      <button onClick={() => dispatch({ type: "SET_TAB", payload: "profile" })}>Profile</button>
      <p>Active Tab: {activeTab}</p>
    </div>
  );
}

export default Scenerio19;
