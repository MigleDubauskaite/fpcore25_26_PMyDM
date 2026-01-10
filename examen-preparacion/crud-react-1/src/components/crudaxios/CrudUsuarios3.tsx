import axios from "axios";
import { useState, type FormEvent } from "react";

interface Cliente {
    id: string;
    name: string;
    country: string;
}

interface Form {
    name: string;
    country: string;
}

function CrudUsuario3() {

    const BASE_URL = 'https://695293803b3c518fca1315de.mockapi.io/customers';

    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [cliente, setCliente] = useState<null | Cliente>(null);

    const formBlanco: Form = { name: '', country: '' };
    const [formData, setFormData] = useState<Form>(formBlanco);

    const [editingId, setEditingId] = useState<null|string>(null);

    const mostrarClientes = async () => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Cliente[]>(BASE_URL);
            setClientes(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar clientes...');
        } finally {
            setLoading(false);
        }
    }

    const mostrarUnCliente = async (id: string) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Cliente>(`${BASE_URL}/${id}`);
            setCliente(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar el cliente...');
        } finally {
            setLoading(false);
        }
    }

    const eliminarCliente = async (id: string) => {

        if (!window.confirm('¿Seguro que quieres borrar?')) return;

        setError(null);
        setLoading(true);

        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setClientes(clientes.filter(c => c.id !== id));
        } catch (error) {
            console.error(error);
            setError('Error al eliminar el cliente...');
        } finally {
            setLoading(false);
        }
    }

    const crearCliente = async (formCliente: Form) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.post<Cliente>(BASE_URL, formCliente);
            setClientes([...clientes, response.data]);
            reset();
        } catch (error) {
            console.error(error);
            setError('Error al crear el cliente...');
        } finally {
            setLoading(false);
        }
    }

    const editarCliente = async (id: string, formCliente: Form) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.put<Cliente>(`${BASE_URL}/${id}`, formCliente);
            setClientes(clientes.map(c => c.id !== id ? c : response.data));
            reset();
        } catch (error) {
            console.error(error);
            setError('Error al mostrar el cliente...');
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        if(!formData.name.trim() || !formData.country.trim()){
            setError('Intenta de nuevo... Los campos no pueden ser vacíos');
            return;
        }

        if (editingId !==null) editarCliente(editingId, formData);
        else crearCliente(formData);

    }

    const handleEdit = (c: Cliente) => {
        setEditingId(c.id);
        setFormData({ name: c.name, country: c.country });
        setCliente(null);
    }

    const reset = () => {
        setEditingId(null);
        setFormData({ name: '', country: '' });
    }

    return (
        <>
            <div style={{ border: '5px solid rgba(214, 140, 103, 1)' }}>
                <h1>CRUD 3</h1>
                <hr />

                {error !== null && <p>{error}</p>}

                {cliente !== null &&
                    <div style={{ border: '5px solid rgba(202, 241, 128, 1)', margin: '40px 0' }}>
                        <ul>
                            <li>{cliente.id}</li>
                            <li>{cliente.name}</li>
                            <li>{cliente.country}</li>
                        </ul>
                    </div>
                }

                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Name: </label>
                        <input type="text" placeholder="Introduce nombre..." value={formData.name}
                            onChange={(e) => {setError(null); setFormData({ ...formData, name: e.target.value })}} />
                        <br />
                        <label>Country: </label>
                        <input type="text" placeholder="Introduce country..." value={formData.country}
                            onChange={(e) => {setError(null); setFormData({ ...formData, country: e.target.value })}} />

                        <br />
                        <button disabled={loading} type="submit" >{editingId !== null ? 'Editar' : 'Crear'}</button>

                        {editingId !== null && <><button type="button" onClick={reset}>Cancelar</button></>}

                    </form>
                </div>

                <button disabled={loading} onClick={() => { mostrarClientes(); setCliente(null) }}>Mostrar clientes</button>

                {clientes.length > 0 &&
                    <>
                        <button disabled={loading} onClick={() => { setClientes([]); setCliente(null) }}>Ocultar clientes</button>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>COUNTRY</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.name}</td>
                                        <td>{c.country}</td>
                                        <td>
                                            <button disabled={loading} onClick={() => mostrarUnCliente(c.id)}>Ver</button>
                                            <button disabled={loading} onClick={() => handleEdit(c)}>Editar</button>
                                            <button disabled={loading} onClick={() => eliminarCliente(c.id)}>Borrar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                }


            </div>
        </>
    )

}

export default CrudUsuario3;