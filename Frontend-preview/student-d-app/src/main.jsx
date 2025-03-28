import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import College from './College.jsx'
import Bank from './Bank.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Bank />
    <College/>
  </StrictMode>,
)
