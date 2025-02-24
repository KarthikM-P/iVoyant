import { useState } from "react";
import { themeContext } from "./globalstate";

export function Themes({children}:{children: React.ReactNode}) {
   const [theme, setTheme] = useState('light');

   const toggleTheme = () => {
     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
   };

   return(
       <themeContext.Provider value={{theme, toggleTheme}}>
           {children}
       </themeContext.Provider>
   );
}
