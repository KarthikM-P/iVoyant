import { useContext} from 'react'
import { themeContext } from './globalstate';

const Demo2 = () => {
    const { theme, toggleTheme } = useContext(themeContext);
    
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <h1>The current theme is {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default Demo2