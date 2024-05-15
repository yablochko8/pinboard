import { useState } from 'react'
import './App.css'

/*******************************************
 OPENING
 *******************************************/

 console.log("App reloaded")


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
  "factotum"
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
 LAZY BUILD OF A LAZY BUTTON
 *******************************************/

let lazyOptionsFirstName = [
  "Clio",
  "Polyhymnia",
  "Terpischore",
  "Urania",
  "Thalia",
  "Melpomene",
  "Calliope",
  "Euterpe",
  "Erato",
  "Alice",
  "Jack",
  "James",
  "Noah",
  "Emma",
  "Mia",
  "Sofia",
  "Maria",
  "Nushi",
  "Jose",
  "Wei",
  "Ahmed",
  "Yan"
]

let lazyOptionsSurname = [
  "Wang",
  "Li",
  "Zhang",
  "Murphy",
  "Kelly",
  "Sullivan",
  "Nielsen",
  "Euterpe",
  "Jensen",
  "Hansen",
  "Smith",
  "Williams",
  "Johnson",
  "Rodriquez",
  "Jones"
]

const fetchRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)]

const createRandomName = () => {
  const firstName = fetchRandomArrayElement(lazyOptionsFirstName);
  const surname = fetchRandomArrayElement(lazyOptionsSurname);
  const returnName = `${firstName} ${surname}`;
  return(returnName)
}

const twitterifyName = (name) => name.replace(/\s+/g, "").toLowerCase().concat(Math.floor(Math.random() * 100))
// regex fun:
// \s matches any whitespace character (spaces, tabs, line breaks)
// + means "one or more", so it will match consecutive whitespace characters as a single item
// g is a flag for global search, meaning it will replace all occurrences throughout the string, not just the first one it finds

let LazyButton = ({updateFormVariable}) => {
  const name = createRandomName()
  const twitter = twitterifyName(name)
  const job = fetchRandomArrayElement(jobWords)
  return(
    <button
      onClick={
        () => {
          console.log("LazyButton clicked by someone lazy");
          updateFormVariable({ formVariable: "name", newValue: name })
          updateFormVariable({ formVariable: "twitter", newValue: twitter })
          updateFormVariable({ formVariable: "jobType", newValue: job })
        }
      }
      >
        I'm lazy - autopopulate the form for me
      </button>
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
    <>
    <div>
      <input
        type= "text"
        value = {formValues[formVariable]}
        onChange={handleInputChange}
        placeholder={`Enter your ${formVariable.toUpperCase()} here`}
        style = {{ width: '60%', padding: '10px'}}
      />
    </div>
    </>
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
      style = {{ width: '60%', padding: '10px' }}
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

let SubmitButton = ({ formValues, wipeFormValues, postNewAd }) => {
  
  const defaultButtonText = "Pin it"
  const warningButtonText = "!! more details needed !!"
  const [buttonText, setButtonText] = useState(defaultButtonText);

  const allEmpty = Object.values(formValues).some(value => value.trim() === "");

  const handleClick = () => {
    if (allEmpty) {
      setButtonText(warningButtonText);
      setTimeout(() => setButtonText(defaultButtonText), 2000)
    }
    else {
      console.log("SubmitButton clicked");
      postNewAd(formValues);
      wipeFormValues();
      setButtonText(defaultButtonText)
    }

  }
  return(
    <button
      onClick={handleClick}
      style = {{ backgroundColor: '#81F', color: '#FFF' }}
    >
      {buttonText}
    </button>
  )
}


const ContextBlock = () => (
  <>
    <h3>Welcome to Pinboard!</h3>
    <p>To pin an ad to the shiny new carousel, just fill out the form and click Pin it!</p>
    <p>If you're too lazy to fill out, just click the grey button above the form.</p>
    <br />
    <br />
    <p className='low-emphasis'>
      <a href="https://github.com/yablochko8/pinboard/blob/main/src/App.jsx">view the code </a>
    </p>
  </>
)

let InputForm = ({ postNewAd }) => {
  const [formValues, setFormValues] = useState (
    {
      name: "",
      twitter: "",
      jobType: "",
    }
  );

  const updateFormVariable = ({ formVariable, newValue }) => {
    setFormValues(prevState => ({
      ...prevState,
      [formVariable]: newValue
    }))
  }

  const wipeFormValues = () => {
    setFormValues(
      {
        name: "",
        twitter: "",
        jobType: "",
      }
    )
  }

  return(
    <>
      <LazyButton updateFormVariable={updateFormVariable} />
      <br />
      <br />
      <InputField formValues={formValues} formVariable="name" updateFormVariable={updateFormVariable} />
      <br />
      <InputField formValues={formValues} formVariable="twitter" updateFormVariable={updateFormVariable} />
      <br />
      <DropdownField formValues={formValues} formVariable="jobType" updateFormVariable={updateFormVariable} dropdownOptions={jobWords} />
      <br />
      <br />
      <SubmitButton formValues={formValues} wipeFormValues={wipeFormValues} postNewAd={postNewAd} />

    </>
  )
}


/*******************************************
 AD POSTS
 *******************************************/

const createSampleAdProps = () => {
  const name = createRandomName()
  const twitter = twitterifyName(name)
  const job = fetchRandomArrayElement(jobWords)
  return({
    name: name,
    twitter: twitter,
    jobType: job
  })
}

const aOrAn = (followingString) => {
  if(['a','e','i','o','u'].includes(followingString[0])) {
  return "an"
} else {
  return "a"
  }}

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
      boxShadow: '0 4px 8px rgba (0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
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
      <h4>{name}</h4>
      <JobLogo jobType ={jobType} />
      <div style = {styles.info}>
        <p style={{height: '2.4em'}}>
          {/* Height style needed here so one-row text shows consistently. */}
          {firstName} wants work as {aOrAn(jobType)} <strong>{jobType}</strong>.
        </p>
        <p>
          <a href={twitterURL}>@{twitter}</a>
        </p>
      </div>
    </div>
  )

}



/*******************************************
 CAROUSEL WALTZ
 *******************************************/

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const AdCarousel = ({ postedAds }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    // autoplay: true,
    // autoplaySpeed: 6000
  };
  return(
    <Slider {...settings}>
      {postedAds.map((ad,index) => (
        <div key={index}>
          <AdPost name={ad.name} jobType={ad.jobType} twitter= {ad.twitter} />
        </div>
      ))}
    </Slider>
  )
}

/*******************************************
 PULL IT ALL TOGETHER
 *******************************************/

function App() {
  const numberOfStartingAds = 15;
  const startingAds =[];
  for (let i = 0; i < numberOfStartingAds; i++)
    {startingAds.push(createSampleAdProps())}

  const [postedAds, setPostedAds] = useState(startingAds)

  console.log("See the current state of the postedAds state, an array of objects with AdPost props:", postedAds)

  const postNewAd = (newAdProps) => {
    setPostedAds(prevState => ([
      newAdProps,
      ...prevState
    ]));
    console.log("postNewAd has been called with", newAdProps)
  }

  return (
    <>
      <div className="container">
        <div className ="left">
          <ContextBlock />
        </div>
        <div className = 'right'>
          <InputForm postNewAd={postNewAd}/>
        </div>
      </div>
      <AdCarousel postedAds={postedAds}/>

    </>
  )
}

export default App