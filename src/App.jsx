import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import EmailBuilder from './component'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
    style={{
      width: '100vw',
      height: '100vh',
    }}
    >
     <EmailBuilder />
    </div>
  )
}

export default App
