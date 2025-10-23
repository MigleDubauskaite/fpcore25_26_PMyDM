import Producto from "./components/Producto";
import Titulo from "./components/Titulo";
import './App.css'
import Contador from "./components/Contador";
import TituloContador from "./components/TituloContador";
import ContadoresConfigurables from './components/ContadoresConfigurables';

function App(){
  return <div>
    <Titulo/>
    <Producto nombre={"Camiseta"} precio={19.99}  disponible={true}  />
     <Producto nombre={"Pantalones"} precio={45.50} disponible={false}  />
     <Producto nombre={"Zapatillas"} precio={89.99} disponible={true}  />
     <Producto nombre={"Reloj"} precio={125.00} disponible={true}  />
     <Producto nombre={"Gafas del sol"} precio={35.75} disponible={false}  />

<TituloContador/>
     <Contador/>
     <Contador/>
     <Contador/>

     <ContadoresConfigurables titulo={'Likes'} inicial={2} paso={2} />
  </div>;
}

export default App;