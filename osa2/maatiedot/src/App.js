import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = ({countries, setFilter}) => {
  if (countries.length > 10)
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  if (countries.length === 1)
    return (
      <Country country={countries[0]} />
    )

  return (
    <ul>
      {countries.map(country =>
        <li key={country.cca3}>{country.name.common}
        <button onClick={() => setFilter(country.name.common)}>show</button>
        </li>
      )}
    </ul>
  )
}

const Country = ({country}) => {
  console.log(country)

  return (
    <>
      <h2>
        {country.name.common}
      </h2>
      <div>
        capital {country.capital[0]}
      </div>
      <div>
        region {country.region}
      </div>
      <h3>
        languages
      </h3>
      <ul>
        {Object.entries(country.languages).map(l =>
          <li key={l[0]}>{l[1]}</li>
        )}
      </ul>
      <img src={country.flags.png} alt="flag" />

      <Weather location={country.capital[0]} />

    </>
  )
}

const Weather = ({location}) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_WEATHER_API

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${location}&units=m`).then(response => {
      console.log(response.data.current)
      setWeather(response.data.current)
    })
  }, [])

  if (!weather.temperature) return (<div> </div>)

  return (
    <>
      <h3>
        Weather in {location}
      </h3>
      <div>
        {`Temperature: ${weather.temperature} Celsius`}
      </div>
      <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
      <div>
        {`Wind: ${weather.wind_speed} km/h direction ${weather.wind_dir}`}
      </div>
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  const shownCountries = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  )


  return (
    <>
      <label> find countries
        <input value={filter} onChange={(event) => setFilter(event.target.value)} />
      </label>
      <Countries countries={shownCountries} setFilter={setFilter} />
    </>
  )
}

export default App;
