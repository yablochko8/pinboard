import { useState } from 'react'
import pinboardLogo from '/pinboard_logo.png'
import './App.css'

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

import gardener from './assets/gardener.png';
import plumber from './assets/plumber.png';
import electrician from './assets/electrician.png';
import magician from './assets/magician.png';
import backupJobImage from './assets/unknown.png'

const jobImages = {
  gardener,
  plumber,
  electrician,
  magician,
}

const getJobImage = (jobName) => {
  console.log(`getJobImage called for ${jobName}`);
  return jobImages[jobName] || backupJobImage;

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
      jobType: "",
      message: ""
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



/*******************************************
 AD POSTS
 *******************************************/

 const sampleAdProps = {
    name: "Alex Party",
    twitterHandle: "alexparty",
    jobType: "gardener",
    message: "Hey everyone I'm available for weeding, mowing, and pruning in the Dublin area"
 }


const AdPost = (props) => {

  const { name, twitterHandle, jobType } = props;
  const twitterURL = 'https://twitter.com/'.concat(twitterHandle)

  const styles = {
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      maxWidth: '300px',
      margin: '10px auto',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba (0, 0, 0, 0.1)'
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    info: {
      margin: '10px 0',
      color: '#333',
      fontSize: '16px',
      lineHeight: '1.5'
    }
  }
  return(
    <div style = {styles.card}>
      <JobLogo jobType ={jobType} />
      <div style = {styles.info}></div>
      <p><strong>{name}</strong></p>
      <p><a href={twitterURL}>@{twitterHandle}</a></p>
    </div>
  )

}




/*******************************************
 PULL IT ALL TOGETHER
 *******************************************/


function App() {
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
          <AdPost {...sampleAdProps} />
        </div>
      </div>
    </>
  )
}

export default App
