import { useMemo } from "react";


const expensiveCalculation = (num: number) => {
  console.log("Running expensive calculation...");
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  return result;
};

function Scenerio10({ num }: { num: number }) {
  const result = useMemo(() => expensiveCalculation(num), [num]); 

  return <p>Result: {result}</p>;
}

export default Scenerio10;
