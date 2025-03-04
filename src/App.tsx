
import Slides from './Slides'
import { SLIDES_DATA } from "./constants";
import './App.css';
const App = () => {
  return (
   
      <div className="App">
        <Slides slides={SLIDES_DATA} />
      </div>
    
  )
}

export default App