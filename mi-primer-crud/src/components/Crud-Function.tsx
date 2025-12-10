import { useState } from "react";
import { apiUsers } from "../services/api";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

//https://chatgpt.com/share/69396155-2bbc-8010-8ec1-ffeed8e36546

export default function CrudUser() {
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);

    const [user, setUser] = useState<User | null>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const listarUsuarios = async () => {
        setLoading(true);
        try {
            const response = await apiUsers.get<User[]>("/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setLoading(false);
        }
    };

    const verUsuario = async (id: number) => {
        setLoading(true);
        try {
            const response = await apiUsers.get<User>("/users/" + id);
            setUser(response.data);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setLoading(false);
        }
    };

    const modificarUsuario = async (idR: number) => {

        setLoading(true);

        try {
            const usuarioActualizado: User = {
                id: idR,
                name,
                email,
                phone
            }

            const response = await apiUsers.put<User>("/users/" + idR, usuarioActualizado);

            setUsers(users.map(u => u.id === idR ? response.data : u));

        } catch (error) {
            console.error(`Error: ${error}`)
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <h2>Listado de usuarios</h2>
            <button onClick={() => listarUsuarios()} disabled={loading}>
                {loading ? "Cargando..." : "Cargar lista de usuarios"}
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>
                                <button onClick={() => verUsuario(u.id)}>Ver</button>
                                <button onClick={() => {modificarUsuario(u.id)}}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {user && (
                <ul>
                    <li>id: {user?.id}</li>
                    <li>name: {user?.name}</li>
                    <li>email: {user?.email}</li>
                    <li>phone: {user?.phone}</li>
                </ul>
            )}

            {}

        </div>
    );
}