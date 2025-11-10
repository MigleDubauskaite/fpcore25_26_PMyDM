import './App.css'
import "./MisEstilos.css"
import MiComponente from './components/MiComponente'
import MiComponente2 from './components/MiComponente2'
import PracticandoFragment from './components/PracticandoFragment'
import UseStateEjercicio from './components/UseStateEjercicio'
import TodoListComponent from './components/ToDoListComponent';
import Evento from './components/Evento';
import Listas from './components/Listas'
import ToDoListEntero from './components/ToDoListEntero';
import ToDoListEnteroAvanzado from './components/ToDoListEnteroAvanzado'

function App() {

  return (
    <>

    <ToDoListEnteroAvanzado></ToDoListEnteroAvanzado>
    <br /><br /><br /><br /> <hr />
      <hr />
    <ToDoListEntero></ToDoListEntero>
    <br /><br /><br /><br /> <hr />
      <hr />
    <Listas></Listas>
      <br /><br /><br /><br /> <hr />
      <hr />
      <Evento></Evento>
      <br /><br /><br /><br /> <hr />
      <hr />
      <MiComponente></MiComponente>
      <br /><br /><hr />
      <MiComponente2></MiComponente2>
      <br /><br /><hr />
      <PracticandoFragment></PracticandoFragment>

      <br /><br /><br /><br /> <hr />
      <hr />
      <UseStateEjercicio></UseStateEjercicio>

      <br /><br /><br /><br /> <hr />
      <hr />
      <TodoListComponent></TodoListComponent>
    </>
  )
}

export default App
