import { useState } from 'react'
import './App.css'
import Contador1 from './components/Contador1'
import SelectorIdioma from './components/SelectorIdioma';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Contador1></Contador1>
      </div>

      <div>
        <SelectorIdioma titulo={""} texto={""} botones={""}></SelectorIdioma>
      </div>
    </>
  )
}

export default App
