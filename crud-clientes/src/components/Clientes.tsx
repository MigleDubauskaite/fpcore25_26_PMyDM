import { useState} from "react";
import { apiClientes } from "../service/api";
import axios from "axios";

interface Cliente {
    id:number;
    nombre:string;
    email:string;
    telefono:string;
    direccion:string;
    activo:boolean;
}

function Clientes() {

    const [loading, setLoading] = useState<boolean>(false);

    const [clientes, setClientes] = useState<Cliente[]>([]);

    // campos necesarios para el formulario (POST && PUT)
    const [idModificado, setIdModificado] = useState<number | null>(null);
    const [nombre, setNombre] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");
    const [direccion, setDireccion] = useState<string>("");
    const [activo, setActivo] = useState<boolean>(false);


    // GET
    const obtenerClientes = async () => {

        setLoading(true);

        try {
            const response = await apiClientes.get<Cliente[]>('/clientes');
            setClientes(response.data);            
        } catch (error) {
            alert('Error al obtener usuarios');
        } finally{
            setLoading(false);
        }
    }

    // GET - por ID
    const obtenerClienteId = async (id:number) => {

        setLoading(true);

        try {

            const response = await axios.get<Cliente>(``);
            
        } catch (error) {
            alert('Error al encontrar el cliente')
        } finally{
            setLoading(false);
        }

    }

    // POST
    const crearClienteNuevo = async () => {

        // validamos el formulario:
        if(!nombre.trim() || !email.trim() || !telefono.trim() || !direccion.trim()) return;

        setLoading(true);

        try {

            // creamos nuevo objeto con los datos del formulario
            const nuevoCliente = {nombre, email, telefono, direccion, activo};

            // Enviamos POST a la API
            // nuevoCliente → datos enviados
            const response = await apiClientes.post<Cliente>('/clientes', nuevoCliente);

            // volvemos a renderizar la lista con el nuevo cliente añadido
            setClientes([...clientes, response.data]);

            limpiarCamposFormulario();
            
        } catch (error) {
            alert('Error al crear nuevo cliente');
        } finally{
            setLoading(false);
        }
    }

    // PUT
    const actualizarCliente = async () => {

        if(idModificado === null) return;
        if(!nombre.trim() || !email.trim() || !telefono.trim() || !direccion.trim()) return;

        setLoading(true);

        try {

            const clienteActualizado:Cliente = {
                id: idModificado,
                nombre, email, telefono, direccion, activo
            }

            const response = await apiClientes.put<Cliente>(`/clientes/${idModificado}`, clienteActualizado);

            setClientes(clientes.map(c => c.id !== idModificado ? c : response.data));

            limpiarCamposFormulario();
            
        } catch (error) {
            alert('Error al modificar cliente');
        } finally{
            setLoading(false);
        }

    }

    // DELETE

    const eliminarCliente = async (id:number) => {

        setLoading(true);

        try {

            await apiClientes.delete(`/clientes/${id}`);
            
            setClientes(clientes.filter(c => c.id !== id));
            
        } catch (error) {
            alert("Error al eliminar cliente");
        } finally{
            setLoading(false);
        }

    }

    const mandarDatosAlFormulario = (cliente:Cliente) => {
        setIdModificado(cliente.id);
        setNombre(cliente.nombre);
        setEmail(cliente.email);
        setDireccion(cliente.direccion);
        setTelefono(cliente.telefono);
        setActivo(cliente.activo);
    }


    const limpiarCamposFormulario = () => {
        setIdModificado(null);
        setNombre("");
        setEmail("");
        setTelefono("");
        setDireccion("");
        setActivo(false);
    }


    return(
        <>

        <button onClick={()=>{obtenerClientes()}} disabled={loading}>Listar clientes</button>

        {loading && <p>⏳ Cargando...</p>}

        <hr />
        <br />

        {/* FORMULARIO: POST O PUT */}
        <h2>{idModificado === null ? 'Crear nuevo cliente' : 'Guardar cliente modificado'}</h2>

        <input 
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
            disabled={loading} />
        
        <input 
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            disabled={loading} />

        <input 
            type="text"
            placeholder="Telefono"
            value={telefono}
            onChange={(e)=>setTelefono(e.target.value)}
            disabled={loading} />

        <input 
            type="text"
            placeholder="Direccion"
            value={direccion}
            onChange={(e)=>setDireccion(e.target.value)}
            disabled={loading} />
        
        <label>
            <input 
                type="checkbox"
                checked={activo}
                onChange={(e) => setActivo(e.target.checked)}
                disabled={loading} />
            Activo
        </label>

        <br />

        {/* POST o PUT */}

        {idModificado === null ? 
            (<button onClick={crearClienteNuevo} disabled={loading}>Crear cliente</button>) 
            : (<>
                <button onClick={actualizarCliente} disabled={loading}>Actualizar cliente</button>
                <button onClick={limpiarCamposFormulario} disabled={loading}>Cancelar</button>
                </>) }


        {/* GET */}

        {clientes.length > 0 && (
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nombre</th>
                        <th>email</th>
                        <th>telefono</th>
                        <th>direccion</th>
                        <th>activo</th>
                        <th>acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.nombre}</td>
                            <td>{c.email}</td>
                            <td>{c.telefono}</td>
                            <td>{c.direccion}</td>
                            <td>{c.activo? 'si' : 'no'}</td>
                            <td>
                                <button onClick={()=>mandarDatosAlFormulario(c)}>Editar</button>
                                <button onClick={()=>eliminarCliente(c.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        
        </>
    )
}

export default Clientes;