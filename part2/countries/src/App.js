import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesList from './components/CountriesList'



const Finder = (props) => {
  return (
    <div>
      Find countries:   
      <input value={props.search} onChange={props.handle} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState('')
  

  useEffect( ( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => { setCountries(response.data)})
  } 
  ), [])

  

  
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleCountryButton = (event) => {
    setSearch(event.target.value)
  }

  
  
  return (
    
    <div>
      <Finder search={search} handle={handleSearch} />
      <CountriesList countries={countries} search={search} handleClick={handleCountryButton} />
    </div>
  )
}

export default App;
