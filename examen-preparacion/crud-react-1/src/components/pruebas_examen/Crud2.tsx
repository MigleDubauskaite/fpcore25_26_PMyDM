import axios from "axios";
import { useState, type FormEvent } from "react";

interface Task {
    id: string;
    title: string;
    assignedTo: string;
    priority: string;
    completed: boolean;
}

interface TaskForm {
    title: string;
    assignedTo: string;
    priority: string;
    completed: boolean;
}

function Crud2() {

    const BASE_URL = 'https://6964d6aee8ce952ce1f34164.mockapi.io/api/tasks';

    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [tareas, setTareas] = useState<Task[]>([]);
    const [tarea, setTarea] = useState<null | Task>(null);

    const taskFormBlank: TaskForm = { title: '', assignedTo: '', priority: '', completed: false };
    const [taskForm, setTaskForm] = useState<TaskForm>(taskFormBlank);

    const [editingID, setEditingID] = useState<null | string>(null);

    const [searchItem, setSearchItem] = useState<string>('');

    const [sortBy, setSortBy] = useState<'title'|'assignedTo' | 'priority'>('title');
    const [sortOrder, setSortOrder] = useState<'asc'| 'desc'>('asc');

    // mostrar todas
    const getAll = async () => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.get<Task[]>(BASE_URL);
            setTareas(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar todas las tareas');
        } finally {
            setLoading(false);
        }
    }

    // mostrar detalle
    const getById = async (id: string) => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.get<Task>(`${BASE_URL}/${id}`);
            setTarea(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar detalle de una tarea');
        } finally {
            setLoading(false);
        }
    }

    // borrar tarea
    const deleteByID = async (id: string) => {

        if (!window.confirm(`¿Eliminar la tarea '${tarea?.title}'?`)) return;

        setError(null);
        setLoading(true);

        try {
            await axios.delete<Task>(`${BASE_URL}/${id}`);
            setTareas(tareas.filter(t => t.id !== id));
        } catch (error) {
            console.error(error);
            setError('Error al borrar una tarea');
        } finally {
            setLoading(false);
        }
    }

    // crear nueva tarea
    const create = async (taskForm: TaskForm) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post<Task>(BASE_URL, taskForm);
            setTareas([...tareas, response.data]);
        } catch (error) {
            console.error(error);
            setError('Error al crear nueva tarea');
        } finally {
            setLoading(false);
        }
    }

    // editar tarea
    const editTarea = async (id: string, taskForm: TaskForm) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.put<Task>(`${BASE_URL}/${id}`, taskForm);
            setTareas(tareas.map(t => t.id !== id ? t : response.data));
        } catch (error) {
            console.error(error);
            setError('Error al editar nueva tarea');
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();

        if (!taskForm.title.trim() || !taskForm.assignedTo.trim()) {
            setError('Los campos no pueden ser vacíos');
            return;
        }

        if (editingID !== null) editTarea(editingID, taskForm);
        else create(taskForm);

        reset();
    }

    const handleEdit = (tarea: Task) => {
        setEditingID(tarea.id);
        setTaskForm({ title: tarea.title, assignedTo: tarea.assignedTo, completed: tarea.completed, priority: tarea.priority });
        setTarea(null);
    }

    const reset = () => {
        setTarea(null);
        setEditingID(null);
        setTaskForm({ title: '', assignedTo: '', completed: false, priority: '' });
    }

    // búsqueda/filtrado
    const tareasFiltradas = tareas.filter(
        (t) => 
            t.title.toLowerCase().includes(searchItem.toLowerCase()) ||
            t.assignedTo.toLowerCase().includes(searchItem.toLowerCase())||
            t.priority.toLowerCase().includes(searchItem.toLowerCase())
    );

    // ordenar tareas

    const handleSort = (column: 'title'| 'assignedTo' | 'priority') => {
        // verifica si la columna que quieremos ordenar ya está ordenada (sortBy). Si está en asc cambiamos a desc y visaversa
        if(sortBy === column) setSortOrder(sortOrder === 'asc' ? "desc" : 'asc'); 
        // queremos ordenar una columna diferente:
        else {
            setSortBy(column); // el valor de sortBy se actualizará a la nueva columna
            setSortOrder("asc"); // iniciamos en asc: así aseguramos que cada vez que es otra columna, la primera ordenación será ascendente
        }
    }

    const tareasSorted = [...tareasFiltradas].sort((a, b) => {
        
        if(sortBy === 'priority'){
            const priorityOrder = {'BAJA':1, 'MEDIA':2, 'ALTA': 3, 'URGENTE': 4};
            const prioridadA = priorityOrder[a.priority as keyof typeof priorityOrder];
            const prioridadB = priorityOrder[b.priority as keyof typeof priorityOrder];
            
            return sortOrder === 'asc' ? prioridadA - prioridadB : prioridadB - prioridadA;
        }

        let valorA = a[sortBy];
        let valorB = b[sortBy];
        
        if(typeof valorA === "string") valorA = valorA.toLowerCase();
        if (typeof valorB === "string") valorB = valorB.toLowerCase();

        if(valorA === valorB) return 0; // Son iguales, no cambia el orden

        const modifier = sortOrder === 'asc' ? 1 : -1;
        
        return valorA > valorB ? modifier : -modifier;
    })

    return (
        <>
            <div style={{ border: '5px solid rgb(151, 150, 252)' }}>

                <h1>Crud de tareas (2)</h1>

                {error !== null && <p className="error">{error}</p>}

                {/* formulario */}
                <div>
                    <h2>Creación de tarea</h2>
                    <div style={{ border: '2px solid rgb(175, 182, 177)', padding: '15px' }}>
                        <form onSubmit={handleSubmit}>
                            <label>Título</label>
                            <input type="text"
                                placeholder="Introduce título..."
                                value={taskForm.title}
                                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} />
                            <br /> <br />

                            <label>Asignado a </label>
                            <input type="text"
                                placeholder="Introduce asignado a..."
                                value={taskForm.assignedTo}
                                onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })} />
                            <br /> <br />

                            <label>Prioridad </label>
                            <select value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}>
                                <option value="">Elige</option>
                                <option value="BAJA">BAJA</option>
                                <option value="MEDIA">MEDIA</option>
                                <option value="ALTA">ALTA</option>
                                <option value="URGENTE">URGENTE</option>
                            </select>
                            <br /><br />

                            <label>Completada</label>
                            <input type="checkbox" checked={taskForm.completed} onChange={(e) => { setTaskForm({ ...taskForm, completed: e.target.checked }) }} />

                            <br /><br />
                            <button>{editingID !== null ? 'Guardar cambios' : 'Crear'}</button>

                            {editingID !== null && <button onClick={reset}>Cancelar</button>}

                        </form>
                    </div>
                </div>

                {/* tabla + detalle */}
                <div >
                    <h2>Lista de customers</h2>
                    <button disabled={loading} onClick={() => { getAll(), setTarea(null) }}>{loading ? 'Cargando...' : 'Mostrar lista de tareas'}</button>


                    {tareas.length > 0 &&
                        <>
                            <button disabled={loading} onClick={() => setTareas([])}>Ocultar tareas</button>
                            <br /><br />

                            <input type="text" placeholder="Buscar" value={searchItem} onChange={(e)=>setSearchItem(e.target.value)}/>
                            <br /><br />

                            <div style={{ display: 'flex' }}>
                                <table style={{ paddingRight: '20px' }}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th onClick={()=>handleSort("title")}>Title <b>{sortOrder==='asc' ? '↑' : '↓'}</b></th>
                                            <th onClick={()=>handleSort("assignedTo")}>Assigned to <b>{sortOrder==='asc' ? '↑' : '↓'}</b></th>
                                            <th onClick={()=>handleSort("priority")}>Priority <b>{sortOrder==='asc' ? '↑' : '↓'}</b></th>
                                            <th>Completed</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tareasSorted.map(t => (
                                            <tr key={t.id}>
                                                <td>{t.id}</td>
                                                <td>{t.title}</td>
                                                <td>{t.assignedTo}</td>
                                                <td>{t.priority}</td>
                                                <td>{t.completed ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <button onClick={() => getById(t.id)}>Ver</button>
                                                    <button onClick={() => deleteByID(t.id)}>❌</button>
                                                    <button onClick={() => handleEdit(t)}>✏️</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* detalle */}
                                {tarea !== null &&
                                    <>
                                        <div style={{ border: '3px solid #5325' }}>
                                            <h2>Información de tarea (id: {tarea.id})</h2>
                                            <button onClick={() => setTarea(null)}>Ocultar tarea</button>
                                            <ul>
                                                <li>{tarea.id}</li>
                                                <li>{tarea.title}</li>
                                                <li>{tarea.assignedTo}</li>
                                                <li>{tarea.priority}</li>
                                                <li>{tarea.completed ? 'Yes' : 'No'}</li>
                                            </ul>
                                        </div>
                                    </>
                                }
                            </div>

                        </>




                    }
                </div>

            </div>
        </>
    )
}

export default Crud2;