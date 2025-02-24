// import React from 'react'

import Scenerio1 from "./Components/Scenerio1"
import Scenerio10 from "./Components/Scenerio10"
import Scenerio11 from "./Components/Scenerio11"
import Scenerio12 from "./Components/Scenerio12"
import Scenerio13 from "./Components/Scenerio13"
import Scenerio14 from "./Components/Scenerio14"
import Scenerio15 from "./Components/Scenerio15"
import Scenerio16 from "./Components/Scenerio16"
import Scenerio17 from "./Components/Scenerio17"
import Scenerio18 from "./Components/Scenerio18"
import Scenerio19 from "./Components/Scenerio19"
import Scenerio2 from "./Components/Scenerio2"
import Scenerio20 from "./Components/Scenerio20"
import Scenerio21 from "./Components/Scenerio21"
import Scenerio23 from "./Components/Scenerio23"
import Scenerio24 from "./Components/Scenerio24"
import Scenerio25 from "./Components/Scenerio25"
import Scenerio3 from "./Components/Scenerio3"
import Scenerio4 from "./Components/Scenerio4"
import Scenerio5 from "./Components/Scenerio5"
import Scenerio6 from "./Components/SCenerio6"
import Scenerio7 from "./Components/Scenerio7"
import Scenerio8 from "./Components/Scenerio8"
import Scenerio9 from "./Components/Scenerio9"

const App = () => {

  const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 16 },
    { id: 3, name: "Charlie", age: 20 }
  ];

  return (
    <>
      <Scenerio1/>
      <Scenerio2/>
      <Scenerio3 />
      <Scenerio4/>
      <Scenerio5/>
      <Scenerio6/>
      <Scenerio7/>
      <Scenerio8 users={users}/>
      <Scenerio9/>
      <Scenerio10 num={100}/>
      <Scenerio11/>
      <Scenerio12 storageKey="username" initialValue="Guest" />
      <Scenerio13/>
      <Scenerio14/>
      <Scenerio15/>
      <Scenerio16/>
      <Scenerio17/>
      <Scenerio18/>
      <Scenerio19/>
      <Scenerio20/>
      <Scenerio21/>
      {/* <Scenerio22/> */}
      <Scenerio23/>
      <Scenerio24/>
      <Scenerio25/>
    </>
    
  )
}

export default App