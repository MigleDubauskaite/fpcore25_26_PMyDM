import './App.css'
import SelectorIdioma from './components/_2SelectorIdioma';
import _1Contador from './components/_1Contador';
import _3CalculadoraPropina from './components/_3CalculadoraPropina';

function App() {

  return (
    <>
      <div>
        <_1Contador></_1Contador>
      </div>

      <div>
        <SelectorIdioma></SelectorIdioma>
      </div>

      <div>
        <_3CalculadoraPropina></_3CalculadoraPropina>
      </div>
    </>
  )
}

export default App
