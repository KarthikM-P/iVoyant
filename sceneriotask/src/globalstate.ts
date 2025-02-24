import { createContext } from "react";

export const themeContext = createContext({theme: 'light', toggleTheme: () => {}});