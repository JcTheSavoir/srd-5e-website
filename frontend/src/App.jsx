import { useState } from 'react'
import './style.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NavBar/>
      <Outlet />









    </div>
  )
}

export default App
