import { useState } from 'react'
import reactLogo from './assets/react.svg'
import pinboardLogo from '/pinboard_logo.png'
import './App.css'

let AppLogo = () => {
  return(
    <>
    <a href="https://en.wikipedia.org/wiki/Main_Page" target="_blank">
      <img src={pinboardLogo} className='logo' alt="Pinboard logo" />
    </a>
    </>
  )
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppLogo />
    <div className ="left">
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
    <div className = 'right'>
      <p> jeiocmeao</p>
    </div>
    </>
  )
}

export default App
