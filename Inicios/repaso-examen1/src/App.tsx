import './App.css'
import Contador from './components/1/Contador';
import Traductor from './components/1/Traductor';
import Calculadora from './components/1/Calculadora';
import TablaNotas from './components/1/TablaNotas';
import Lista from './components/1/Lista';
import Inventario from './components/2/1InventarioConHistorial';
import SelectorTema from './components/2/2SelectorTema';
import CalculadoraDescuentos from './components/2/3CalculadoraDescuentos';
import TablaProducto from './components/2/4TablaProductos';
import GestorTarea from './components/2/5GestorTareas';

function App() {

  return (
    <>

    <div>
      <Inventario></Inventario>
      <SelectorTema></SelectorTema>
      <CalculadoraDescuentos></CalculadoraDescuentos>
      <TablaProducto></TablaProducto>
      <GestorTarea></GestorTarea>
    </div>

    <Contador></Contador>    
    <Traductor></Traductor>  
    <Calculadora></Calculadora>
    <TablaNotas></TablaNotas>
    <Lista></Lista>
    </>
  )
}

export default App
