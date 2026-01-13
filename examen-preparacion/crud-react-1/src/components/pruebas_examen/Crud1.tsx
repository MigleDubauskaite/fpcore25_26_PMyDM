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

function Crud1() {

    const BASE_URL = 'https://6964d6aee8ce952ce1f34164.mockapi.io/api/tasks';

    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<null | Task>(null);

    const taskFormBlanco: TaskForm = { title: '', assignedTo: '', priority: '', completed: false };
    const [taskForm, setTaskForm] = useState(taskFormBlanco);

    const [editingID, setEditingID] = useState<null | string>(null);

    const [searchItem, setSearchItem] = useState<string>('');

    const [sortBy, setSortBy] = useState<'id' | 'priority' | 'title' | 'assignedTo'>('id');
    const [sortOrder, setSortOrder] = useState<'asc'|'desc'>('asc');

    const [validationError, setValidationError] = useState<string[]>([]);

    /* 1: MOSTRAR  */
    const mostrarTasks = async () => {

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get<Task[]>(BASE_URL);
            setTasks(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar los usuarios');
        } finally {
            setLoading(false);
        }
    }

    /* 2: MOSTRAR UN TASK */
    const mostrarTask = async (id: string) => {

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get<Task>(`${BASE_URL}/${id}`);
            setTask(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar el usuarios');
        } finally {
            setLoading(false);
        }
    }

    /* 3:  ELIMINAR*/
    const eliminar = async (id: string) => {

        if (!window.confirm(`Seguro que quieres borrar el task con id ${id}?`)) return;

        setLoading(true);
        setError(null);

        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error(error);
            setError('Error al eliminar el usuarios');
        } finally {
            setLoading(false);
        }
    }

    /* 4: CREAR */
    const crearTask = async (form: TaskForm) => {

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<Task>(BASE_URL, form);
            setTasks([...tasks, response.data]);
            reset();
        } catch (error) {
            console.error(error);
            setError('Error al crear el usuario nuevo');
        } finally {
            setLoading(false);
        }
    }

    /* 5: EDITAR */
    const editarTask = async (id: string, form: TaskForm) => {

        setLoading(true);
        setError(null);

        try {
            const response = await axios.put<Task>(`${BASE_URL}/${id}`, form);
            setTasks(tasks.map(t => t.id !== id ? t : response.data));
        } catch (error) {
            console.error(error);
            setError('Error al crear el usuario nuevo');
        } finally {
            setLoading(false);
        }
    }

    /* MÉTODOS AUXILIARES PARA CREAR Y EDITAR */
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!taskForm.assignedTo) {
            setError('¡El campo de -- asignado a -- es obligatorio!');
            return;
        }
        if (!taskForm.title.trim()) {
            setError('¡El título es obligatorio!');
            return;
        }

        if (editingID !== null) editarTask(editingID, taskForm);
        else crearTask(taskForm);
    }

    const handleEdit = (t: Task) => {
        setEditingID(t.id);
        setTaskForm({ title: t.title, assignedTo: t.assignedTo, completed: t.completed, priority: t.priority });
        setTask(null);
    }

    const reset = () => {
        setEditingID(null);
        setTaskForm({ title: '', assignedTo: '', completed: false, priority: '' });
    }

    /* BÚSQUEDA/FILTRADO */
    const filteredTasks = tasks.filter(t => 
        t.title.toLowerCase().includes(searchItem.toLowerCase()) || 
        t.assignedTo.toLowerCase().includes(searchItem.toLowerCase()) || 
        t.priority.toLowerCase().includes(searchItem.toLowerCase()));
    
    const tasksToShow = searchItem ? filteredTasks : tasks;
    
    /* ORDENAR POR COLUMNAS */
    const handleSort = (column: 'id' | 'priority' | 'title' | 'assignedTo') =>{
        if(sortBy === column) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        else {
            setSortBy(column); 
            setSortOrder('asc')
        }
    }

    /* VALIDACIONES AVANZADAS */
    const validateForm = ():boolean => {

        const errors: string[] = [];

        if(taskForm.title.trim().length < 2) errors.push('El título tiene que tener al menos 2 caracteres');
        if(taskForm.assignedTo.trim().length < 3) errors.push('El nombre de asignado a tiene que tener al menos 3 caracteres');

        //     /.../ Eso es una expresión regular (RegEx: sirve para validar textos).
        //     ^     Inicio del texto
        //     [a-zA-ZáéíóúÁÉÍÓÚñÑ\s]  Conjunto de caracteres permitidos
        //     +     Uno o más caracteres
        //     $     Fin del texto

        //     .test()    Devuelve true si el texto cumple la condición
        if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(taskForm.title) || 
            !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(taskForm.title)) {
                errors.push('El título y el valor de asignado solo puede contener letras')
        }

        return errors.length === 0;
    }
    
    

    return (
        <>
            <div style={{ border: '5px solid rgb(191, 255, 151)' }}>

                <h1>CRUD: TASKS 1</h1>

                

                <div>
                    <h2>Formulario de tareas</h2>

                    <form onSubmit={handleSubmit}>
                        <label>TÍTULO</label>
                        <input type="text" placeholder="Introduce título..." value={taskForm.title}
                            onChange={(e) => { setTaskForm({ ...taskForm, title: e.target.value }) }} />
                        <br />

                        <label>ADIGNADO A: </label>
                        <input type="text" placeholder="Introduce nombre" value={taskForm.assignedTo}
                            onChange={(e) => { setTaskForm({ ...taskForm, assignedTo: e.target.value }) }} />
                        <br />

                        <label>Prioridad</label>
                        <select value={taskForm.priority} onChange={(e) => { setTaskForm({ ...taskForm, priority: e.target.value }) }}>
                            <option value="">Selecciona prioridad</option>
                            <option value="BAJA">Baja</option>
                            <option value="MEDIA">Media</option>
                            <option value="ALTA">Alta</option>
                            <option value="URGENTE">Urgente</option>
                        </select>
                        <br />

                        <label>Completada: </label>
                        <input type="checkbox" checked={taskForm.completed}
                            onChange={(e) => { setTaskForm({ ...taskForm, completed: e.target.checked }) }} />
                        <br />
                        <br />

                        <button disabled={loading} type="submit">{editingID !== null ? "Editar" : "Crear"}</button>

                        {editingID !== null && <button disabled={loading} type="button" onClick={reset}>Cancelar</button>}
                    </form>
                    <br /><br />
                </div>

                {error && <p>{error}</p>}

                {task !== null &&
                    <>
                        <div style={{ border: '3px solid rgb(151, 252, 255)', margin: '15px' }}>
                            <ul>
                                <li>{task.id}</li>
                                <li>{task.title}</li>
                                <li>{task.assignedTo}</li>
                                <li>{task.priority}</li>
                                <li>{task.completed}</li>
                            </ul>
                            <button onClick={() => setTask(null)}>Ocultar</button>
                        </div>
                    </>
                }

                
                <label>Buscar:  </label>
                <input type="text" placeholder="Buscar por título, asignado a o prioridad" value={searchItem}
                        onChange={(e)=>setSearchItem(e.target.value)} />
                <br /> <br />

                <button disabled={loading} onClick={mostrarTasks}>{loading ? 'Loading' : 'CARGAR TAREAS'}</button>

                {tasks.length > 0 &&
                    <>
                    <br /> <br />

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th onClick={()=>handleSort('title')}>TÍTULO</th>
                                <th>ASIGNADO A</th>
                                <th>PRIORIDAD</th>
                                <th>COMPLETADA</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasksToShow.map(t => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.title}</td>
                                    <td>{t.assignedTo}</td>
                                    <td>{t.priority}</td>
                                    <td>{t.completed ? 'Sí' : 'No'}</td>
                                    <td>
                                        <button disabled={loading} onClick={() => { mostrarTask(t.id) }}>Ver</button>
                                        <button disabled={loading} onClick={() => eliminar(t.id)}>❌</button>
                                        <button disabled={loading} onClick={() => { handleEdit(t) }}>✏️</button>
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

export default Crud1;