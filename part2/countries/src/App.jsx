import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountryDetails = ({ countryName }) => {
  const [details, setDetails] = useState(undefined)

  useEffect(() => {
  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
    .then(response => setDetails(response.data))
  }, [countryName])

  if (details) {
    return (
      <>
        <h1>{details.name.common}</h1>
        <p>capital {details.capital}</p>
        <p>area {details.area}</p>
        <h2>languages:</h2>
        {Object.values(details.languages).map(l => <p key={l}>{l}</p>)}
        <img src={details.flags.png}/>
      </>
    )
  } else {
    return undefined
  }
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
        {countries.map(c => <p key={c}>{c}</p>)}
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
  }
    , []
  )

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
