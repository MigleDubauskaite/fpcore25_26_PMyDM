import './App.css'
import ComparacionFetchVsAxios from './components/ComparacionFetchVsAxios';
import MultipleApis from './components/MultipleApis';
import CrudUsers from './components/Crud-Function';

function App() {


  return (
    <>

      <h1>Mi primer crud</h1>
      <hr />
      <h2>Comparación Fetch vs Axios</h2>
      <ComparacionFetchVsAxios />

      <br /><br />
      <hr />
      <MultipleApis></MultipleApis>

       <br /><br />
      <hr />
      <CrudUsers></CrudUsers>
    </>
  )
}

export default App
