import axios from "axios";
import { useState, type FormEvent } from "react";

interface Task {
    id: number;
    title: string;
    assignedTo: string;
    priority: string;
    completed: boolean;
}

interface FormTask {
    title: string;
    assignedTo: string;
    priority: string;
    completed: boolean;
}

function Crud5Productos() {

    const BASE_URL = 'https://6964d6aee8ce952ce1f34164.mockapi.io/api/tasks';

    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<null | Task>(null);

    const formTaskEmpty: FormTask = { title: '', assignedTo: '', priority: '', completed: false };
    const [formTask, setFormTask] = useState<FormTask>(formTaskEmpty);

    const [editingID, setEditingID] = useState<null | number>(null);

    const [searchItem, setSearchItem] = useState<string>('');

    const [sortBy, setSortBy] = useState<'id' | 'title' | 'assignedTo' | 'priority'>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // 1: mostrar
    const getAll = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Task[]>(BASE_URL);
            setTasks(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar todas las tareas');
        } finally {
            setLoading(false);
        }
    }

    // 2: mostrar
    const getById = async (id: number) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Task>(`${BASE_URL}/${id}`);
            setTask(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar detalle de la tarea');
        } finally {
            setLoading(false);
        }
    }

    // 3: eliminar
    const eliminar = async (id: number) => {

        const tareaDelete = tasks.find(t => t.id === id);

        if (!window.confirm(`¿Eliminar la tarea '${tareaDelete?.title}'?`)) return;

        setError(null);
        setLoading(true);

        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error(error);
            setError('Error al eliminar la tarea');
        } finally {
            setLoading(false);
        }
    }

    // 4: crear
    const crearTarea = async (form: FormTask) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post<Task>(BASE_URL, form);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error(error);
            setError('Error al crear la tarea');
        } finally {
            setLoading(false);
        }
    }

    // 5: editar
    const editarTarea = async (id: number, form: FormTask) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.put<Task>(`${BASE_URL}/${id}`, form);
            setTasks(tasks.map(t => t.id === id ? response.data : t));
        } catch (error) {
            console.error(error);
            setError('Error al editar la tarea');
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (editingID !== null) editarTarea(editingID, formTask);
        else crearTarea(formTask);

        reset();
    }

    const handleEdit = (t: Task) => {
        setEditingID(t.id);
        setFormTask({ title: t.title, assignedTo: t.assignedTo, priority: t.priority, completed: t.completed });
        setTask(null);
    }

    const reset = () => {
        setFormTask({ title: '', assignedTo: '', priority: '', completed: false });
        setEditingID(null);
    }

    // filtrar
    const tareasFiltradas = tasks.filter(t =>
        t.title.toLowerCase().includes(searchItem.toLowerCase()) || t.assignedTo.toLowerCase().includes(searchItem.toLowerCase()) || t.priority.toLowerCase().includes(searchItem.toLowerCase())
    )

    // ordenar
    const handleSort = (column: 'id' | 'title' | 'assignedTo' | 'priority') => {

        if (sortBy === column) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        else {
            setSortBy(column);
            setSortOrder('asc');
        }
    }

    const tareasOrdenadas = [...tareasFiltradas].sort((a, b) => {

        const priorityOrder = { BAJA: 1, MEDIA: 2, ALTA: 3, URGENTE: 4 };

        if (sortBy === 'id') {
            let valA = a[sortBy];
            let valB = b[sortBy];
            return sortOrder === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
        }
        else if (sortBy === 'priority') {
            const valAA = priorityOrder[a.priority as keyof typeof priorityOrder];
            const valBB = priorityOrder[b.priority as keyof typeof priorityOrder];

            return sortOrder === 'asc' ? valAA - valBB : valBB - valAA;
        }
        else {
            let valA = a[sortBy];
            let valB = b[sortBy];

            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            if (valA === valB) return 0;

            const modifier = sortOrder === 'asc' ? 1 : -1;

            return valA > valB ? modifier : -modifier;
        }

    })


    return (
        <>
            <div>

                <h1>CRUD 5</h1>

                {!error && <p>{error}</p>}

                <div>
                    <h3>formulario</h3>
                    <form onSubmit={handleSubmit}>

                        <label>titulo</label>
                        <input type="text"
                            placeholder="titulo"
                            value={formTask.title}
                            onChange={(e) => setFormTask({ ...formTask, title: e.target.value })} />
                        <br />

                        <label>asignado</label>
                        <input type="text"
                            placeholder="asignado a"
                            value={formTask.assignedTo}
                            onChange={(e) => setFormTask({ ...formTask, assignedTo: e.target.value })} />
                        <br />

                        <label>Prioridad</label>
                        <select value={formTask.priority} onChange={(e) => setFormTask({ ...formTask, priority: e.target.value })}>
                            <option value="">elige</option>
                            <option value="BAJA">Baja</option>
                            <option value="MEDIA">Media</option>
                            <option value="ALTA">Alta</option>
                            <option value="URGENTE">Urgente</option>
                        </select>
                        <br />

                        <label>completada </label>
                        <input type="checkbox"
                            checked={formTask.completed}
                            onChange={(e) => setFormTask({ ...formTask, completed: e.target.checked })} />
                        <br />

                        <button type="submit">{editingID !== null ? 'guardar cambios' : 'crear'}</button>

                        {editingID !== null && <button type="button" onClick={reset}>Cancelar</button>}

                    </form>
                </div>

                {task !== null && <>
                    <h3>Detalle de la tarea '{task.title}'</h3>
                    <ol>
                        <li>{task.id}</li>
                        <li>{task.title}</li>
                        <li>{task.assignedTo}</li>
                        <li>{task.priority}</li>
                        <li>{task.completed ? 'yes' : 'no'}</li>
                    </ol>
                    <button onClick={() => setTask(null)}>Ocultar</button>
                </>}

                <button disabled={loading} onClick={() => { getAll(); setTask(null) }}>Mostrar</button>

                {tasks.length > 0 && <>
                    <input type="text" placeholder="buscar por titulo, asignado a y prioridad" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')}>id</th>
                                <th onClick={() => handleSort('title')}>title</th>
                                <th onClick={() => handleSort('assignedTo')}>assignedTo</th>
                                <th onClick={() => handleSort('priority')}>priority</th>
                                <th>completed</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tareasOrdenadas.map(t => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.title}</td>
                                    <td>{t.assignedTo}</td>
                                    <td>{t.priority}</td>
                                    <td>{t.completed ? 'yes' : 'no'}</td>
                                    <td>
                                        <button disabled={loading} onClick={() => getById(t.id)}>Ver</button>
                                        <button disabled={loading} onClick={() => handleEdit(t)}>Editar</button>
                                        <button disabled={loading} onClick={() => eliminar(t.id)}>Borrar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>}


            </div>
        </>
    )
}

export default Crud5Productos;