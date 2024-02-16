import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const ShowCountryDetails = ({ countryName }) => {
  const [details, setDetails] = useState(undefined)
  const [weather, setWeather] = useState(undefined)

  useEffect(() => {
    if (details) {
      console.log("what is going on");
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${details.capital}&appid=${api_key}`)
        .then(response => setWeather(response.data))
    }
  }, [countryName, details])

  useEffect(() => {
    console.log("api");
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
      .then(response => setDetails(response.data))
  }, [countryName])

  if (details && weather) {
    return (
      <>
        <h1>{details.name.common}</h1>
        <p>capital {details.capital}</p>
        <p>area {details.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(details.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={details.flags.png} />
        <h2>Weather in {details.capital}</h2>
        <p>temperature {(weather.main.temp - 273).toFixed(2)} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>wind {weather.wind.speed}m/s</p>
      </>
    )
  } else {
    return undefined
  }
}

const ShowCountry = ({ countryName }) => {
  const [show, setShow] = useState(false)
  const onClickHandler = () => setShow(!show)
  return (
    <>
      <p>
        {countryName}
        <button onClick={onClickHandler}>show</button>
      </p>
      {show ? <ShowCountryDetails countryName={countryName} /> : undefined}
    </>
  )
}

const ShowCountries = ({ countries }) => {
  if (!countries) {
    return undefined
  }

  if (countries.length === 1) {
    return (
      <ShowCountryDetails countryName={countries[0]} />
    )
  } else if (countries.length < 11) {
    return (
      <>
        {countries.map(c => <ShowCountry key={c} countryName={c} />)}
      </>
    )
  } else {
    return (
      <p>To many matches, specify another filter</p>
    )
  }
}

function App() {
  const [countries, setCountries] = useState(undefined)
  const [searchText, setSearchText] = useState("")
  const [searchedCountries, setSearchedCountries] = useState(undefined)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data.map(c => c.name.common))
      })
  }, [])

  useEffect(() => {
    if (countries) {
      setSearchedCountries(countries.filter(c => c.toUpperCase().includes(searchText.toUpperCase())))
    }
  }, [searchText, countries])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  return (
    <>
      <h1>Countries</h1>
      <p>
        find countries
        <input
          value={searchText}
          onChange={handleSearchChange}
        />
      </p>
      <ShowCountries countries={searchedCountries} />
    </>
  )
}

export default App
