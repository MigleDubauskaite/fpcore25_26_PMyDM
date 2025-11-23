import './App.css'
import SelectorIdioma from './components/_2SelectorIdioma';
import _1Contador from './components/_1Contador';
import _3CalculadoraPropina from './components/_3CalculadoraPropina';
import _4TablaNotas from './components/_4TablaNotas';
import _5Listas from './components/_5Listas';
import Contador from './components/segundo/1Contador';
import Traductor from './components/segundo/2Traductor';
import Calculadora from './components/segundo/3Calculadora';
import Notas from './components/segundo/4Notas';
import Lista from './components/segundo/5Lista';

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

       <div>
        <_4TablaNotas></_4TablaNotas>
      </div>

      <div>
        <_5Listas></_5Listas>
      </div>


      <div>
        <hr />
        <hr />
        <div>
          <Contador></Contador>
          <Traductor></Traductor>
          <Calculadora></Calculadora>
          <Notas></Notas>
          <Lista></Lista>
        </div>
      </div>

    </>
  )
}

export default App
