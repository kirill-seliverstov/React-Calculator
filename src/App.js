import React, { useState } from 'react'
import { Button } from './components/button';

function App() {
  const [history, setHistory] = useState('')
  const [current, setCurrent] = useState('0')
  const [asdf, setAsdf] = useState([])
  const [result, setResult] = useState('')


  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const makeOperation = (expression) => {
    let a = expression[0]
    let op = expression[1]
    let b = expression[2]

    if (op === '+') return a + b
    if (op === '-') return a - b
  }

  const handleOperation = (op) => {
    if (asdf.length < 2) {
      asdf.push(+current, op)
      setCurrent('')

    } else if (asdf.length === 2) {
      asdf.push(+current)
      makeOperation(asdf)

      setHistory(history + asdf[asdf.length - 1])

      setCurrent(makeOperation(asdf))
      setResult(makeOperation(asdf))

      asdf.length = 0
    }
  }

  // каждая кнопка смотрит, есть ли в массиве число и операция, если да, кнопка
  //  выполняет операцию в массиве с лежащим в нем числом и current
  // смотреть есть ли операция в массиве и чуть что менять ее

  return (
    <div>
      {current}

      <div>
        {numbers.map(num => {
          return <Button key={num} value={num} onClick={(e) => {
            +current === 0 ? setCurrent(e.target.value) : setCurrent(current + e.target.value)
          }} />
        })}
      </div>

      <Button value={'AC'} onClick={() => {
        setHistory('')
        setCurrent('')
      }} />

      <Button value={'C'} onClick={() => {
        setCurrent('')
      }} />

      <Button value={'±'} onClick={() => +current >= 0 ? setCurrent(-Math.abs(+current)) : setCurrent(Math.abs(+current))} />

      <Button value={'+'} onClick={(e) => {
        handleOperation(e.target.value)

        setHistory(history + asdf.join(' '))
      }} />

      <Button value={'-'} onClick={(e) => {
        handleOperation(e.target.value)

        setHistory(history + asdf.join(' '))
      }} />


      <p>current: {current}</p>
      <p>history: {history}</p>
      <p>asdf: {asdf.join(' ')}</p>
      <p>result: {result}</p>

    </div>
  );


}

export default App;
