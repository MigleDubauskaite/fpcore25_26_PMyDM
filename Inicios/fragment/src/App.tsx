import './App.css'
import "./MisEstilos.css"
import MiComponente from './components/MiComponente'
import MiComponente2 from './components/MiComponente2'
import PracticandoFragment from './components/PracticandoFragment'
import UseStateEjercicio from './components/UseStateEjercicio'
import TodoListComponent from './components/ToDoListComponent';

function App() {

  return (
    <>
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
