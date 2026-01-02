
// 2:
// DEFINIMOS INTERFACES TS

import axios from "axios";
import { useState, type FormEvent } from "react";

// Datos completos que vienen de la API (incluye id)

interface Customer {
    id: number;
    name: string;
    country: string;
}

// Datos del formulario (sin id ni campos autogenerados)

interface CustomerForm {
    name: string;
    country: string;
}


function CrudUsuarios() {

    // 3: 
    // CONFIGURAMOS ESTADOS DEL COMPONENTE

    const BASE_URL = 'https://695293803b3c518fca1315de.mockapi.io/customers';

    // Indicador de carga (deshabilita botones)
    const [loading, setLoading] = useState<boolean>(false);

    // Mensajes de error para el usuario
    const [error, setError] = useState<string | null>(null);


    // Cliente individual para mostrar detalle
    const [customer, setCustomer] = useState<Customer | null>(null);

    // Lista completa de clientes
    const [customers, setCustomers] = useState<Customer[]>([]);

    // Datos de formulario:
    const formDataEnBlanco = { name: '', country: '' };
    const [formData, setFormData] = useState<CustomerForm>(formDataEnBlanco);

    // ID del cliente en edición (null = modo crear)
    const [editingId, setEditingId] = useState<number | null>(null);


    // 4:
    // READ - todos los clientes

    const findAllCustomers = async () => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Customer[]>(BASE_URL);
            setCustomers(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al cargar los clientes');
        } finally {
            setLoading(false);
        }
    }


    // 5: 
    // READ - un cliente por ID

    const findCustomerById = async (id: number) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Customer>(`${BASE_URL}/${id}`);
            setCustomer(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al encontrar el cliente');
        } finally {
            setLoading(false);
        }
    }


    // 6:
    // DELETE

    const deleteCustomerById = async (id: number) => {

        if (!window.confirm(`¿Seguro que quieres borrar el cliente ${id}?`)) return;

        setError(null);
        setLoading(true);

        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setCustomers(customers.filter(c => c.id != id));

            // Limpiar vista individual si es el mismo
            if (customer?.id === id) setCustomer(null);

        } catch (error) {
            console.error(error);
            setError("Error al borrar el cliente");
        } finally {
            setLoading(false);
        }

    }


    // 7:
    // CREATE

    const createCustomer = async (customerData: CustomerForm) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.post<Customer>(BASE_URL, customerData);
            setCustomers([...customers, response.data]);
            resetForm();
        } catch (error) {
            console.error(error);
            setError("Error al crear el cliente");
        } finally {
            setLoading(false);
        }
    }


    // 8:
    // UPDATE

    const updateCustomer = async (id: number, customerData: CustomerForm) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.put<Customer>(`${BASE_URL}/${id}`, customerData);
            setCustomers(customers.map(c => c.id === id ? response.data : c));

            // Actualizar vista individual si es el mismo
            if (customer?.id === id) setCustomer(response.data);

            resetForm();
        } catch (error) {
            console.error(error);
            setError("Error al actualizar el cliente");
        } finally {
            setLoading(false);
        }

    }



    // 9:
    // FUNCIONES AUXILIARES

    // MANEJAR ENVIO DEL FORMULARIO
    const handleSubmit = (e: FormEvent) => {

        e.preventDefault(); // Evitar recarga de página

        if (!formData.name.trim() || !formData.country.trim()) {
            setError('Por favor, completa todos los campos');
            return;
        }

        // creación o edición:
        if (editingId != null) updateCustomer(editingId, formData);
        else createCustomer(formData);
    }

    // PREPARAR FORMULARIO PARA EDITAR
    const handleEdit = (c: Customer) => {
        setFormData({ name: c.name, country: c.country });
        setEditingId(c.id);
    }

    // LIMPIAR FORMULARIO
    const resetForm = () => {
        setEditingId(null);
        setFormData(formDataEnBlanco);
    }


    return (
        <>
            <div style={{border: '5px solid #a75ace43', padding: '50px'}}>
                <h1>CRUD</h1>
                <hr />

                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem' }}>
                        {error}
                    </div>
                )}

                {/* SECCIÓN 7: FORMULARIO */}
                <h3>Creación de customer</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:
                            <input type="text"
                                value={formData.name}
                                onChange={e => {
                                    setFormData({ ...formData, name: e.target.value });
                                    setError(null);
                                }
                                }
                                disabled={loading}
                                placeholder="Nombre del cliente" />
                        </label>
                        <br />

                        <label>País:
                            <input type="text"
                                value={formData.country}
                                onChange={e => setFormData({ ...formData, country: e.target.value })}
                                disabled={loading}
                                placeholder="País del cliente" />
                        </label>
                    </div>

                    <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>

                    {editingId && (
                        <button type="button" onClick={resetForm} disabled={loading}>Cancelar edición</button>
                    )}

                </form>

                {/* SECCIÓN 5: VISTA INDIVIDUAL*/}
                {/* READ - info de un cliente ID*/}
                {customer &&
                    <>
                        <h3>Información de customer</h3>
                        <ul>
                            <li>Id: {customer.id}</li>
                            <li>Name: {customer.name}</li>
                            <li>Country: {customer.country}</li>
                        </ul>
                        <button disabled={loading} onClick={() => setCustomer(null)}>Ocultar customer</button>
                        <br /><br />
                    </>
                }

                {/* SECCIÓN 4: TABLA CON LISTA */}
                {/* READ - todos usuarios */}

                <h3>Lista de customers</h3>
                <button onClick={findAllCustomers} disabled={loading}>Mostrar lista</button>

                {customers.length !== 0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.country}</td>
                                    <td>
                                        <button onClick={() => findCustomerById(c.id)} disabled={loading}>Ver</button>

                                        <button onClick={() => handleEdit(c)}>Editar</button>

                                        <button onClick={() => deleteCustomerById(c.id)} disabled={loading}>Borrar</button>
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

export default CrudUsuarios;