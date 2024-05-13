import { useState } from 'react'
import reactLogo from './assets/react.svg'
import pinboardLogo from '/pinboard_logo.png'
import './App.css'
import backupJobImage from './assets/unknown.png'


/*******************************************
 HEADER
 *******************************************/
console.log("App reloaded")

 let AppLogo = () => {
  return(
    <>
    <a href="https://en.wikipedia.org/wiki/Main_Page" target="_blank">
      <img src={pinboardLogo} className='logo' alt="Pinboard logo" />
    </a>
    </>
  )
}

/*******************************************
 JOB LIST AND IMAGES
 *******************************************/


const jobList = [
  "gardener",
  "plumber",
  "electrician",
  "magician",
]

const getJobImage = (jobName) => {
  try {
    return require(`./assets/${jobName}.png`);
  } catch (error) {
    return backupJobImage;
  }
}


let JobLogo = (jobType) => {
  console.log("JobLogo called")
  const image = getJobImage(jobType)
  const linkTarget = 'https://en.wikipedia.org/wiki/'.concat(jobType)
  const altText = [jobType].concat(" image")
  return(
    <>
      <a href={linkTarget} target="_blank">
        <img src={image} className='logo' alt={altText} /> 
      </a>
    </>
  )
}


/*******************************************
 INPUT FORM
 *******************************************/


let InputField = () => {
  return(
    <input />
  )
}




let InputForm = () => {
  const [formValues, setFormValues] = useState (
    {
      name: "",
      twitterHandle: "",
      availableFor: ""
    }
  )

  return(
    <>
      <InputField />
      <InputField />
    </>
  )
}





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppLogo />
    <div className ="left">
      <InputForm />
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
    <JobLogo jobType="gardener" />
    </>
  )
}

export default App
