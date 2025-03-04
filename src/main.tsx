import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ARTICLES_DATA } from "./constants.tsx";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App articles={ARTICLES_DATA}/>
  </StrictMode>,
)
