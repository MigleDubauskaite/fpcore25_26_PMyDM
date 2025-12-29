
// 2:
// DEFINIMOS INTERFACES TS

import axios from "axios";
import { useState } from "react";

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

        if (!confirm(`¿Seguro que quieres borrar el cliente ${id}?`)) return;

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



    return (
        <>
            <div>
                <h1>CRUD</h1>
                <hr />

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