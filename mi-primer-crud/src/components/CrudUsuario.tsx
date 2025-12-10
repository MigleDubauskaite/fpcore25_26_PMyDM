import { useState } from 'react';
import { apiUsers } from '../services/api';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

function CrudUsuarios() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState<User | null>(null);

    // Formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    // GET - Obtener usuarios
    const obtenerUsuarios = async () => {
        setLoading(true);
        try {
            const response = await apiUsers.get<User[]>('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        } finally {
            setLoading(false);
        }
    };

    // GET - Obtener un usuario
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


    // PUT - Actualizar usuario
    const actualizarUsuario = async () => {
        if (!editingId || !name || !email || !phone) return;

        setLoading(true);
        try {
            const usuarioActualizado = { id: editingId, name, email, phone };
            const response = await apiUsers.put<User>(`/users/${editingId}`, usuarioActualizado);

            // Actualizar en la lista
            setUsers(users.map(user =>
                user.id === editingId ? response.data : user
            ));

            // Limpiar formulario
            setName('');
            setEmail('');
            setPhone('');
            setEditingId(null);

            alert('Usuario actualizado');
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar usuario');
        } finally {
            setLoading(false);
        }
    };

    // POST - Crear usuario
    const crearUsuario = async () => {
        if (!name || !email || !phone) {
            alert('Completa todos los campos');
            return;
        }

        setLoading(true);
        try {
            const nuevoUsuario = { name, email, phone };
            const response = await apiUsers.post<User>('/users', nuevoUsuario);

            // Agregar el nuevo usuario a la lista
            setUsers([...users, response.data]);

            // Limpiar formulario
            setName('');
            setEmail('');
            setPhone('');

            alert('Usuario creado');
        } catch (error) {
            console.error('Error al crear:', error);
            alert('Error al crear usuario');
        } finally {
            setLoading(false);
        }
    };

    // DELETE - Eliminar usuario
    const eliminarUsuario = async (id: number) => {
        if (!confirm('¿Eliminar este usuario?')) return;

        setLoading(true);
        try {
            await apiUsers.delete(`/users/${id}`);

            // Eliminar de la lista
            setUsers(users.filter(user => user.id !== id));

            alert('Usuario eliminado');
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('Error al eliminar usuario');
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos de un usuario en el formulario para editar
    const prepararEdicion = (user: User) => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setEditingId(user.id);
    };

    // Cancelar edición
    const cancelarEdicion = () => {
        setName('');
        setEmail('');
        setPhone('');
        setEditingId(null);
    };

    return (
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

                          <button onClick={() => verUsuario(user.id)}>Ver</button>
                    </li>
                ))}
            </ul>

                        {user && (
                <ul>
                    <li>id: {user?.id}</li>
                    <li>name: {user?.name}</li>
                    <li>email: {user?.email}</li>
                    <li>phone: {user?.phone}</li>
                </ul>
            )}
        </div>
    );
}

export default CrudUsuarios;