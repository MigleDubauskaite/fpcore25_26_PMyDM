import axios from "axios";
import { useState, type FormEvent } from "react";

interface Customer {
    id: string;
    name: string;
    country: string;
}

interface FormCustomer {
    name: string;
    country: string;
}

function CrudUsuarios2() {

    const BASE_URL = 'https://695293803b3c518fca1315de.mockapi.io/customers';

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);

    const [editingID, setEditingID] = useState<null | string>(null);

    const formVacio: FormCustomer = { name: '', country: '' };
    const [formData, setFormData] = useState<FormCustomer>(formVacio);

    // TODOS LOS DATOS
    const obtenerLista = async () => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Customer[]>(BASE_URL);
            setCustomers(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar lista de Customers');
        } finally {
            setLoading(false);
        }
    }

    // UN CUSTOMER
    const obtenerCustomerPorId = async (id: string) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Customer>(`${BASE_URL}/${id}`);
            setCustomer(response.data);

        } catch (error) {
            console.error(error);
            setError('Error al mostrar el Customer');
        } finally {
            setLoading(false);
        }
    }

    // ELIMINAR UN CUSTOMER
    const eliminarUnCustomer = async (id: string) => {

        if (!window.confirm(`Seguro que quieres eliminar el Customer con ID ${id}`)) return;

        setError(null);
        setLoading(true);

        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setCustomers(customers.filter(c => c.id !== id));
        } catch (error) {
            console.error(error);
            setError('Error al borrar el Customer');
        } finally {
            setLoading(false);
        }
    }

    // CREAR NUEVO CUSTOMER
    const crearNuevoCustomer = async (formCustomer: FormCustomer) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.post<Customer>(BASE_URL, formCustomer);
            setCustomers([...customers, response.data]);
            resetForm();
        } catch (error) {
            console.error(error);
            setError('Error al crear el Customer');
        } finally {
            setLoading(false);
        }
    }

    // EDITAR UN CUSTOMER
    const editarCustomer = async (id: string, formCustomer: FormCustomer) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.put<Customer>(`${BASE_URL}/${id}`, formCustomer);
            setCustomers(customers.map(c => c.id !== id ? c : response.data));
            resetForm();
        } catch (error) {
            console.error(error);
            setError('Error al editar el Customer');
        } finally {
            setLoading(false);
        }
    }


    // METODO AUXILIAR: ENVIAR LOS DATOS
    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();

        if (!formData.name.trim() || !formData.country.trim()) {
            setError('Intenta de nuevo... Los campos no pueden ser vacíos');
            return;
        }

        if (editingID !== null) editarCustomer(editingID, formData);
        else crearNuevoCustomer(formData);

    }

    // METODO AUXILIAR: PREPARAR EDICIÓN
    const handleEdit = (c: Customer) => {
        setCustomer(null);
        setEditingID(c.id);
        setFormData({ name: c.name, country: c.country });
    }

    // METODO AUXILIAR: LIMPIAR FORMULARIO
    const resetForm = () => {
        setEditingID(null);
        setFormData(formVacio);
    }


    return (
        <>
            <div style={{ border: '5px solid #3c9e8eff', padding: '50px' }}>
                <h1>CRUD 2</h1>

                {error &&
                    <>
                        <h3>{error}</h3>
                        <hr />
                    </>
                }

                {loading && <p>Cargando...</p>}

                <div style={{ border: '3px solid #ffb477ff', marginBottom: '30px' }}>
                    <h3>Formulario: </h3>

                    <form onSubmit={handleSubmit}>
                        <label><a>Name: </a><input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></label>
                        <br />

                        <label><a>Country: </a><input
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })} /></label>

                        <br /><br />
                        <button disabled={loading} type="submit">{editingID !== null ? 'Editar' : 'Crear'}</button>

                        {editingID !== null &&
                            <button type="button" onClick={resetForm}>Cancelar</button>
                        }

                    </form>
                    <br />
                </div>


                {customer != null &&
                    <div style={{ border: '3px solid #baa8f8ff', marginBottom: '30px' }}>
                        <ul>
                            <li>{customer.id}</li>
                            <li>{customer.name}</li>
                            <li>{customer.country}</li>
                        </ul>
                        <button onClick={() => setCustomer(null)}>❌</button>
                    </div>
                }

                <button disabled={loading} onClick={() => { obtenerLista(); setCustomer(null); resetForm() }}>Mostrar lista de Customers</button>

                {customers.length > 0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>COUNTRY</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.country}</td>

                                    <td>
                                        <button disabled={loading} onClick={() => obtenerCustomerPorId(c.id)}>Ver</button>
                                        <button disabled={loading} onClick={() => eliminarUnCustomer(c.id)}>Borrar</button>
                                        <button disabled={loading} onClick={() => handleEdit(c)}>Editar</button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>

                }


            </div>
        </>
    )
}

export default CrudUsuarios2;