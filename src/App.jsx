import { useState } from 'react'
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
  console.log(`./assets/${jobName}.png`)
  try {
    return require(`./assets/${jobName}.png`);
  } catch (error) {
    return backupJobImage;
  }
}


let JobLogo = ({ jobType }) => {
  console.log("JobLogo called", jobType)
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
    <input name= "hello"/>
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
      <h3>Let us know what jobs you're interested in!</h3>
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
      <div className="container">
        <div className ="left">
          <InputForm />

        </div>
        <div className = 'right'>
          <p> This text should be in the right-hand column </p>
          <JobLogo jobType = "gardener" />
        </div>
      </div>
    </>
  )
}

export default App
