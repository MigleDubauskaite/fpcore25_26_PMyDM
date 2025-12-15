import { useState } from "react";
import { apiUsers } from "../services/api";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

function PrimerCrud() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    // Limpia todo el formulario
    const limpiarFormulario = () => {
        setName('');
        setEmail('');
        setPhone('');
        setEditingId(null);
    };

    // Cargar datos en el formulario para editar
    const prepararEdicion = (user: User) => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setEditingId(user.id);
    };

    // Cancelar edición
    const cancelarEdicion = () => {
        limpiarFormulario();
    };


    // GET - Obtener usuarios
    const obtenerUsuarios = async () => {
        setLoading(true);
        try {
            const response = await apiUsers.get<User[]>('/users');
            setUsers(response.data);
        } catch (error) {
            alert('Error al obtener usuarios');
        } finally {
            setLoading(false);
        }
    };

    // POST - Crear usuario (validación aquí)
    const crearUsuario = async () => {

        if (!name.trim() || !email.trim() || !phone.trim()) {
            alert('Todos los campos son obligatorios');
            return;
        }

        setLoading(true);

        try {
            const nuevoUsuario = { name, email, phone };
            const response = await apiUsers.post<User>('/users', nuevoUsuario);

            setUsers([...users, response.data]);
            limpiarFormulario();
            alert('Usuario creado');

        } catch (error) {
            alert('Error al crear usuario');
        } finally {
            setLoading(false);
        }
    };

    // PUT - Actualizar usuario (validación aquí)
    const actualizarUsuario = async () => {
        if (editingId === null) return;

        if (!name.trim() || !email.trim() || !phone.trim()) {
            alert('Todos los campos son obligatorios');
            return;
        }

        setLoading(true);

        try {
            const usuarioActualizado = { id: editingId, name, email, phone };
            const response = await apiUsers.put<User>(`/users/${editingId}`, usuarioActualizado);

            setUsers(users.map(user =>
                user.id === editingId ? response.data : user
            ));

            limpiarFormulario();
            alert('Usuario actualizado');
        } catch (error) {
            alert('Error al actualizar usuario');
        } finally {
            setLoading(false);
        }
    };


    // DELETE - Eliminar usuario
    const eliminarUsuario = async (id: number) => {

        setLoading(true);

        try {
            await apiUsers.delete(`/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
            alert('Usuario eliminado');
        } catch (error) {
            alert('Error al eliminar usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 style={{ color: 'rgba(253, 68, 68, 1)' }}>MI PRIMER CRUD</h1>
            <br /><br />
            <hr />
            <br />

            <div style={{ padding: '20px' }}>
                <h2>CRUD Completo - Usuarios</h2>

                <button onClick={obtenerUsuarios} disabled={loading}>
                    Obtener Usuarios
                </button>

                <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
                    
                    <h3>{editingId ? 'Editar Usuario' : 'Crear Usuario'}</h3>

                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />

                    <input
                        type="tel"
                        placeholder="Teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={loading}
                    />

                    {editingId ? (
                        <>
                            <button onClick={actualizarUsuario} disabled={loading}>
                                Actualizar
                            </button>
                            <button onClick={cancelarEdicion} disabled={loading}>
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <button onClick={crearUsuario} disabled={loading}>
                            Crear
                        </button>
                    )}
                </div>

                {loading && <p>⏳ Cargando...</p>}

                <h3>Lista de Usuarios ({users.length})</h3>
                
                <ul>
                    {users.map(user => (
                        <li key={user.id} style={{ marginBottom: '10px' }}>
                            <strong>{user.name}</strong> - {user.email} - {user.phone}
                            <button
                                onClick={() => prepararEdicion(user)}
                                disabled={loading}
                                style={{ marginLeft: '10px' }}
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => eliminarUsuario(user.id)}
                                disabled={loading}
                                style={{ marginLeft: '5px' }}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default PrimerCrud;