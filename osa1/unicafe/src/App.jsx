// "Toteuta tilastojen näyttäminen HTML:n taulukkona siten, että saat sovelluksesi 
// näyttämään suurin piirtein samalta kun aiemmissa unicafe-tehtävissä." 
// (ulkoasun määritystä tarvitaan, joten tarvitaan css-tiedosto ja älä poista 
// node_modules-hakemistoa, koska silloin ei suoriudu komento npm run dev.)
import './App.css'
import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive + " %"} />
    </div>
  )
}

// Reactissä <tr>-elementit pitää olla aina <thead>, <tbody> tai <tfoot> sisällä, 
// muuten tulee hydration error.
const StatisticLine = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [values, setValue] = useState([])

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
    setValue(values.concat(1))
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(updatedNeutral + good + bad)
    setValue(values.concat(0))
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(updatedBad + good + neutral)
    setValue(values.concat(-1))
  }

  let sum = 0
  let average = 0
  let positives = 0
  let positive = 0
  values.forEach(value => {
    sum += value
    average = sum / all
    if (value > 0) {
      positives += 1
      positive = positives / all * 100
    }
  })
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}
        all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
