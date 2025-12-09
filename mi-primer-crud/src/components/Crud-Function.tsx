import { useState } from "react";
import { apiUsers } from "../services/api";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

function CrudUsers() {

    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);

    const listarUsuarios = async () => {

        setLoading(true);

        try {
            const response = await apiUsers.get<User[]>('/users');
            setUsers(response.data);
        } catch (error) {
            console.error(`Error al obtener la lista de usuarios ${users}`);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <>
            <h2>Primeras Crud funciones</h2>

            <h3>Listado de usuarios</h3>

            <button disabled={loading} onClick={listarUsuarios}>{loading ? 'Cargando' : 'Mostrar lista de usuarios'}</button>

            <table style={{ border: '1px solid grey' }}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>acciones</th>
                    </tr>
                </thead>
                <tbody >
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>
                                <button>ver</button>
                                <button>editar</button>
                                <button>borrar</button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>

        </>
    )
}

export default CrudUsers;