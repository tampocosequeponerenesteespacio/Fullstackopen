import React,{useState,useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({capital}) => {
  const [weather, setWeather] = useState({})
  
  
  useEffect(  () => {
        
    
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital})`)
      .then(response => {
        console.log('responsedata',response.data);               
        setWeather( {
          temperature: response.data.current.temperature,
          icon: response.data.current.weather_icons[0],
          windSpeed: response.data.current.wind_speed,
          windDirection: response.data.current.wind_dir, 
          
        } )
      })
      .catch( () => alert('Cant display weather icon. Your monthly usage limit has been reached. Please upgrade your Subscription Plan.'))
  },[capital] 
  )

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature: {weather.temperature} Celsius</p>
      <img src={weather.icon} alt='weather' />
      <p>wind: {weather.windSpeed} mph direction {weather.windDirection}</p>
    </div>
  )


}

const DisplaySingleCountry = (props) => {
    
    const country = props.country      
  
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>languages</h3>
        
        <ul>
          {country.languages.map( lang => <li key={lang.name}>{lang.name} </li>) }
        </ul>
        <br />
        <img src={country.flag} alt='flag' width="300px" />
        
        <Weather capital={country.capital} />      
        


      </div>
    )
  }

  



const CountriesList = (props) => {
    const filteredList =
    props.countries.filter( c => c.name.toLowerCase().includes(props.search.toLowerCase()))
    
    if(filteredList.length >= 10) {
      return <div>To many matches, be more specific</div>
    } else if(filteredList.length === 1) {
      return <DisplaySingleCountry country={filteredList[0]} />
    } else if(filteredList.length === 0) {
      return <div>No matches</div>
    } else {
      return (
        <ul>
          { filteredList.map( c => 
            <li key={c.name}>{c.name} 
            <button onClick={props.handleClick} value={c.name}>show</button>
            </li>
            ) 
            } 
          
        </ul>
      )
    }
  }

export default CountriesList