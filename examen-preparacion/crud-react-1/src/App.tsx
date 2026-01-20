import './components/pruebas_examen/Estilos.css'
import CrudUsuarios from './components/crudaxios/CRUDUsuarios';
import CrudUsuarios2 from './components/crudaxios/CrudUsuarios2';
import CrudUsuario3 from './components/crudaxios/CrudUsuarios3';
import CrudUsuario4 from './components/crudaxios/CrudUsuarios4';
import Crud1 from './components/pruebas_examen/Crud1';
import Crud2 from './components/pruebas_examen/Crud2';
import CrudProductos3 from './components/pruebas_examen/Crud3Products';
import Crud4Products from './components/pruebas_examen/Crud4Products';
import Crud5Productos from './components/pruebas_examen/Crud5Task';

function App() {
  return (
    <>
      <Crud5Productos></Crud5Productos>
      <br /><br /><br /><br />
      <Crud4Products></Crud4Products>
      <br /><br /><br /><br />
      <CrudProductos3></CrudProductos3>
      <br /><br /><br /><br />
      <Crud2></Crud2>
      <br /><br /><br /><br />

      <div style={{ padding: '20', margin: '10' }}>
        <Crud1></Crud1>
      </div>

      <CrudUsuarios></CrudUsuarios>
      <br /><br /><br /><br />
      <CrudUsuarios2></CrudUsuarios2>
      <br /><br /><br /><br />
      <CrudUsuario3></CrudUsuario3>
      <br /><br /><br /><br />
      <CrudUsuario4></CrudUsuario4>
    </>
  )
}

export default App
