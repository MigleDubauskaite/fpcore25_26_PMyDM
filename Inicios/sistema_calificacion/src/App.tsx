import './App.css'
import Calificacion from './components/Calificacion';

function App() {

  return(
    <div>

      <Calificacion titulo={"🍕Califica la Pizza"} maxEstrellas={5} calificacionInicial={2}/>

    </div>
  )

}

export default App
