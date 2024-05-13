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

const jobWords = [
  "gardener",
  "plumber",
  "electrician",
  "magician",
  "something else"
]

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


let InputField = ({ formValues, formVariable, updateFormVariable }) => {
  const handleInputChange = (event) => {
    updateFormVariable({ formVariable: formVariable, newValue: event.target.value })
  }
  return(
    <input
      type= "text"
      value = {formValues[formVariable]}
      onChange={handleInputChange}
      placeholder={`Enter your ${formVariable} here`}
      style = {{ width: '45%', padding: '10px'}}
    />
  )
}

let DropdownField = ({ formValues, formVariable, updateFormVariable, dropdownOptions }) => {
  const handleInputChange = (event) => {
    updateFormVariable({ formVariable: formVariable, newValue: event.target.value })
  }
  return(
    <select
      value={formValues[formVariable]}
      onChange={handleInputChange}
      style = {{ width: '45%', padding: '10px' }}
    >
      <option>Select your profession: </option>
      {dropdownOptions.map((option, index) =>(
        <option key={index} value={option} >
          {option}
        </option>
      )
    )}
    </select>
  )
}

let SubmitButton = ({ formValues, postNewAd }) => {
  return(
    <button
      onClick={
        () => {
          console.log("yes the button works ish");
          postNewAd(formValues)
        }
      }
    >
      Post
    </button>
  )
}

let InputForm = ({ postNewAd }) => {
  const [formValues, setFormValues] = useState (
    {
      name: "",
      twitter: "",
      jobType: "plumber",
    }
  );

  const updateFormVariable = ({ formVariable, newValue }) => {
    setFormValues(prevState => ({
      ...prevState,
      [formVariable]: newValue
    }))
  }

  return(
    <>
      <h3>Let us know what jobs you're interested in!</h3>
      <InputField formValues={formValues} formVariable="name" updateFormVariable={updateFormVariable} />
      <br />
      <br />
      <InputField formValues={formValues} formVariable="twitter" updateFormVariable={updateFormVariable} />
      <br />
      <br />
      <DropdownField formValues={formValues} formVariable="jobType" updateFormVariable={updateFormVariable} dropdownOptions={jobWords} />
      <br />
      <br />
      <SubmitButton formValues={formValues} postNewAd={postNewAd} />
    </>
  )
}


/*******************************************
 AD POSTS
 *******************************************/

const sampleAdProps = {
    name: "Alex Party",
    twitter: "alexparty",
    jobType: "gardener",
 }


const AdPost = (props) => {

  const { name, twitter, jobType } = props;
  const twitterURL = 'https://twitter.com/'.concat(twitter)
  const firstName = name.split(' ')[0]

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
      <div style = {styles.info}>
        <p><strong>{name}</strong></p>
        <p>{firstName} is interested in work as a <strong>{jobType}</strong>.</p>
        <p><a href={twitterURL}>@{twitter}</a></p>
      </div>
    </div>
  )

}




/*******************************************
 PULL IT ALL TOGETHER
 *******************************************/


function App() {
  const [postedAds, setPostedAds] = useState([sampleAdProps])
  console.log("ZZZZZ",postedAds)



  const postNewAd = (newAdProps) => {
    setPostedAds(prevState => ([
      newAdProps,
      ...prevState
    ]));
    console.log("postNewAd has been called with", newAdProps)
  }

  return (
    <>
      <h1>Pinnnnboard</h1>
      <AppLogo />
      <div className="container">
        <div className ="left">
          <InputForm postNewAd={postNewAd}/>

        </div>
        <div className = 'right'>
          <h3> Latest posts: </h3>
          {postedAds.map((ad, index) => (
            <AdPost name={ad.name} jobType={ad.jobType} twitter={ad.twitter} />
          ))

          }
        </div>
      </div>
    </>
  )
}

export default App
