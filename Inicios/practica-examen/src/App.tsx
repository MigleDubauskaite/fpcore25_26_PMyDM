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
import Contador3 from './components/tercero/1Contador';
import Traductor3 from './components/tercero/2Traductor';
import Calculadora3 from './components/tercero/3Calculadora';
import Nota3 from './components/tercero/4Nota';
import Lista from './components/tercero/5Lista';
import Lista3 from './components/tercero/5Lista';
import Contador4 from './components/4/1Contador';
import ControladorTemperatura from './components/otro1/1ControladorTemperatura';
import Traductor4 from './components/4/2Traductor';
import SelectorGeneroMusica from './components/otro1/2SelectorGeneroMusica';
import Calculadora4 from './components/4/3Calculadora';
import CalculadoraVelocidad from './components/otro1/3CalculadoraVelocidad';
import CalculadoraSueldo from './components/otro1/3CalculadoraSueldo';
import Nota4 from './components/4/4Nota';
import Lista4 from './components/4/5Lista';

function App() {

  return (
    <>

    <div>
      <h1>adicionales</h1>
      <ControladorTemperatura></ControladorTemperatura>
      <SelectorGeneroMusica></SelectorGeneroMusica>
      <CalculadoraVelocidad></CalculadoraVelocidad>
      <CalculadoraSueldo></CalculadoraSueldo>
    </div>

    <div>
      <h1>4º Intento</h1>
      <Contador4></Contador4>
      <Traductor4></Traductor4>
      <Calculadora4></Calculadora4>
      <Nota4></Nota4>
      <Lista4></Lista4>

    </div>

      <div>
        <h1>Tercer intento:</h1>
        <Contador3></Contador3>
        <Traductor3></Traductor3>
        <Calculadora3></Calculadora3>
        <Nota3></Nota3>
        <Lista3></Lista3>
      </div>

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
