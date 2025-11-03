import './App.css'
import Calificacion from './components/Calificacion';
import EnergiaPersonaje from './components/EnergiaPersonaje';
import MeditorEmocion from './components/MeditorEmocion';
import TituloCalificacion from './components/TituloCalificacion';
import MiComponente from './components/MiComponente';
import PracticandoFragment from './components/PracticandoFragment';
import MiComponente2 from './components/MiComponente2';

function App() {

    //const miArticulo = "Libro";

  return (
    <div>

      <MiComponente2></MiComponente2>
      <br /><br /><br /><br /><br />
      <hr />
      <hr />
      <hr />

      <PracticandoFragment></PracticandoFragment>
      <br /><br /><br /><br /><br />
      <hr />
      <hr />
      <hr />

      <MiComponente></MiComponente>

      <br /><br /><br /><br /><br />
      <hr />
      <hr />
      <hr />

      <TituloCalificacion />
      <Calificacion titulo={"🍕 Califica la Pizza"} maxEstrellas={5} calificacionInicial={0} />

      <Calificacion titulo={"🎬 Califica la Película"} maxEstrellas={10} calificacionInicial={7} />

      <Calificacion titulo={"🏨 Califica el Hotel"} maxEstrellas={3} calificacionInicial={2} />

      <Calificacion titulo={"📚 Califica el Libro"} maxEstrellas={5} calificacionInicial={4} />

      <Calificacion titulo={"🎮 Califica el Videojuego"} maxEstrellas={10} calificacionInicial={8} />

      <Calificacion titulo={"☕ Califica el Café"} maxEstrellas={3} calificacionInicial={0} />

      <br /><br /><br /><br /><br />
      <hr />
      <hr />
      <hr />

      <EnergiaPersonaje nivelMax={5} nivelActual={0} />
      <EnergiaPersonaje nivelMax={5} nivelActual={2} />
      <EnergiaPersonaje nivelMax={5} nivelActual={4} />
      <EnergiaPersonaje nivelMax={5} nivelActual={5} />

      <br /><br /><br /><br /><br />
      <hr />
      <hr />
      <hr />
      <MeditorEmocion nivelActual={1} nivelMax={5}/>



    </div>
  )

}

export default App
