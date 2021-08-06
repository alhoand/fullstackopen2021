import { React, useEffect, useState } from 'react'
import axios from 'axios'

const MAX_COUNTRIES = 10
const FLAG_HEIGHT = 100
const FLAG_WIDTH = FLAG_HEIGHT * (3/2)
const API_KEY = process.env.REACT_APP_API_KEY

const WeatherForcast = ({ country }) => {
  //console.log("Weather Forecast props", country);
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    const capital = country.capital
    //console.log(" Testing useEffect inside a component !", capital)

    const handleWeatherRequest = (data) => {
      //console.log(data);
      setWeatherData(data)
    }
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?q='
            .concat(capital)
            .concat('&appid=').concat(API_KEY)
            .concat('&units=metric'))
      .then((response) => {
        //console.log("We are fetching data!")
        handleWeatherRequest(response.data)
      })
      .catch(() => {} )
      //console.log("no weather data found")
  }, [country.capital, setWeatherData])
  //console.log("weather data is", weatherData)

  if (weatherData.hasOwnProperty("weather")) {
    const weather = weatherData.weather[0]
    const main = weatherData.main
    const wind = weatherData.wind
    const imageUrl = "http://openweathermap.org/img/wn/".concat(weather.icon).concat("@2x.png")


    return(
      <div>
        <h3>Weather in {country.capital}</h3>
        <p><b>Temperature: {main.temp.toString().concat("C")}</b></p>
        <img src={imageUrl} alt={"icon depicting ".concat(weather.description)} width="50" height="50"></img>
        <span>  <b>{weather.description}</b></span>
        <p><b>Wind: {wind.speed.toString().concat("m/s")}</b></p>

      </div>
      )
  } else{
       ////console.log("hello from here")
    return (
      <div></div>
    )
  }
  
}

const FullCountry = (props) => {
  //console.log("FullCountry props", props);
  return (
    <div>
      <h2>
        {props.country.name}
      </h2>
      <div>
        <p>capital: {props.country.capital}</p>
        <p>population: {props.country.population}</p>
      </div>
      <div>
        <h3>
          languages
        </h3>
        <ul>
          {props.country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
        </ul>
      </div>
      <div>
        <img src={props.country.flag} alt={"flag of ".concat(props.country.name)} width={FLAG_WIDTH} height={FLAG_HEIGHT}/>
      </div>
      <WeatherForcast country={props.country}/>
    </div>
  )
}


const Country = ( props ) => {
  //console.log(props);
  return (
    <div>
      <span>{props.country.name}</span>
      <span> </span>
      <button onClick={props.handleClick}>show</button>
        </div>
  )
}

const Display = (props) => {
  //console.log("display props", props)
  const length = props.countries.length
  if (length <= MAX_COUNTRIES && length > 1) {   
    return (
      <div>
        { props.countries.map(country => {
          return (
              <Country key={country.name} country={country} handleClick={props.handleClick}/> 
          )
        }) }
      </div>
    )
  }

  if (length === 1) {
    return (
      <FullCountry country={props.countries[0]}/>
    )
  }

  if (props.countries.length > MAX_COUNTRIES) {
    return <span>Too many countries match. Please specify.</span> 
  }
    
  return (
    <div>
    </div>
  )
}

const Input = (props) => {
  //console.log(props);
  return (
    <div>
      find countries <input value={props.userQuery} onChange={props.handleInputChange} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [userQuery, setUserQuery] = useState('')
  

  const handleInputChange = (event) => {
    //console.log(event.target.value)
    setUserQuery(event.target.value) 
  }

  const handleClick = (event) => {
    setUserQuery(event.target.previousSibling.previousSibling.textContent)
  }

  const filterCountries = (query) => {
    
    const temp = countries.filter(entry => entry.name.trim()
      .toLowerCase().includes(query.trim().toLowerCase()))
    if (temp.length > MAX_COUNTRIES) {
      return temp.slice(MAX_COUNTRIES + 1)
    }
    
    return temp
  }
  

  useEffect(() => {
    //console.log("UseEffect is used here!")
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        ////console.log(response)
        setCountries(response.data)
      })
      .catch(() => {} )
      //console.log("Virheilmoitus tähän")
  }, [])

  
  return (
    <div>
      <Input userQuery={userQuery} handleInputChange={handleInputChange} />
      <Display countries={filterCountries(userQuery)} handleClick={handleClick}
       />
    </div>
  );
}

export default App;
