import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countries}) => {
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
        <li key={country.cca3}>{country.name.common}</li>
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
      <Countries countries={shownCountries} />
    </>
  )
}

export default App;
