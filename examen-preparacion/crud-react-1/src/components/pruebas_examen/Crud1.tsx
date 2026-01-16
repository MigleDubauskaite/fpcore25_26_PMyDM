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
    const BASE_URL = "https://6964d6aee8ce952ce1f34164.mockapi.io/api/tasks";

    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<null | Task>(null);

    const taskFormBlanco: TaskForm = {
        title: "",
        assignedTo: "",
        priority: "",
        completed: false,
    };
    const [taskForm, setTaskForm] = useState(taskFormBlanco);

    const [editingID, setEditingID] = useState<null | string>(null);

    const [searchItem, setSearchItem] = useState<string>("");

    const [sortBy, setSortBy] = useState<"id" | "priority" | "title" | "assignedTo">("id");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    /* 1: MOSTRAR  */
    const mostrarTasks = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get<Task[]>(BASE_URL);
            setTasks(response.data);
        } catch (error) {
            console.error(error);
            setError("Error al mostrar los usuarios");
        } finally {
            setLoading(false);
        }
    };

    /* 2: MOSTRAR UN TASK */
    const mostrarTask = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get<Task>(`${BASE_URL}/${id}`);
            setTask(response.data);
        } catch (error) {
            console.error(error);
            setError("Error al mostrar el usuarios");
        } finally {
            setLoading(false);
        }
    };

    /* 3:  ELIMINAR*/
    const eliminar = async (id: string) => {
        if (!window.confirm(`¿Eliminar la tarea '${task?.title}'?`)) return;

        setLoading(true);
        setError(null);

        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setTasks(tasks.filter((t) => t.id !== id));
        } catch (error) {
            console.error(error);
            setError("Error al eliminar el usuarios");
        } finally {
            setLoading(false);
        }
    };

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
            setError("Error al crear el usuario nuevo");
        } finally {
            setLoading(false);
        }
    };

    /* 5: EDITAR */
    const editarTask = async (id: string, form: TaskForm) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put<Task>(`${BASE_URL}/${id}`, form);
            setTasks(tasks.map((t) => (t.id !== id ? t : response.data)));
        } catch (error) {
            console.error(error);
            setError("Error al crear el usuario nuevo");
        } finally {
            setLoading(false);
        }
    };

    /* MÉTODOS AUXILIARES PARA CREAR Y EDITAR */
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (editingID !== null) editarTask(editingID, taskForm);
        else crearTask(taskForm);
    };

    const handleEdit = (t: Task) => {
        setEditingID(t.id);
        setTaskForm({
            title: t.title,
            assignedTo: t.assignedTo,
            completed: t.completed,
            priority: t.priority,
        });
        setTask(null);
    };

    const reset = () => {
        setEditingID(null);
        setTaskForm({ title: "", assignedTo: "", completed: false, priority: "" });
    };

    /* BÚSQUEDA/FILTRADO */
    const filteredTasks = tasks.filter((t) =>
        t.title.toLowerCase().includes(searchItem.toLowerCase()) ||
        t.assignedTo.toLowerCase().includes(searchItem.toLowerCase()) ||
        t.priority.toLowerCase().includes(searchItem.toLowerCase())
    );

    /* ORDENAR POR COLUMNAS */
    const handleSort = (column: "id" | "priority" | "title" | "assignedTo") => {
        if (sortBy === column) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === "id") {
            return sortOrder === "asc"
                ? Number(aValue) - Number(bValue)
                : Number(bValue) - Number(aValue);
        } 

        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();

        const modifier = sortOrder === "asc" ? 1 : -1;
        return aValue > bValue ? modifier : -modifier; // Si el orden es ascendente: modifier = 1; si no: modifier = -1
    });

    /* VALIDACIONES AVANZADAS */
    const validateForm = (): boolean => {
        const errors: string[] = [];

        //     /.../ Eso es una expresión regular (RegEx: sirve para validar textos).
        //     ^     Inicio del texto
        //     [a-zA-ZáéíóúÁÉÍÓÚñÑ\s]  Conjunto de caracteres permitidos
        //     +     Uno o más caracteres
        //     $     Fin del texto

        //     .test()    Devuelve true si el texto cumple la condición

        if (taskForm.title.length < 5 || taskForm.title.length > 100) {
            errors.push("El título debe tener entre 5 y 100 caracteres");
        }

        const validPriorities = ["BAJA", "MEDIA", "ALTA", "URGENTE"];
        if (!validPriorities.includes(taskForm.priority)) {
            errors.push("Prioridad no válida");
        }

        const onlyLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (!onlyLetters.test(taskForm.title)) {
            errors.push("El título solo puede contener letras");
        }

        if (!onlyLetters.test(taskForm.assignedTo)) {
            errors.push('El campo "Asignado a" solo puede contener letras');
        }

        if (!taskForm.priority) {
            errors.push("Debes seleccionar una prioridad");
        }

        setValidationErrors(errors);

        return errors.length === 0;
    };

    return (
        <>
            <div style={{ border: "5px solid rgb(191, 255, 151)" }}>

                <h1>CRUD: TASKS 1</h1>

                {validationErrors.map((error, i) => (
                    <p key={i} style={{ color: "red" }}>{error}</p>
                ))}

                <div>
                    <h2>Formulario de tareas</h2>

                    <form onSubmit={handleSubmit}>
                        <label>TÍTULO</label>
                        <input
                            type="text"
                            placeholder="Introduce título..."
                            value={taskForm.title}
                            onChange={(e) => {
                                setTaskForm({ ...taskForm, title: e.target.value });
                            }}
                        />
                        <br />

                        <label>ASIGNADO A: </label>
                        <input
                            type="text"
                            placeholder="Introduce nombre"
                            value={taskForm.assignedTo}
                            onChange={(e) => {
                                setTaskForm({ ...taskForm, assignedTo: e.target.value });
                            }}
                        />
                        <br />

                        <label>Prioridad</label>
                        <select
                            value={taskForm.priority}
                            onChange={(e) => {
                                setTaskForm({ ...taskForm, priority: e.target.value });
                            }}
                        >
                            <option value="">Selecciona prioridad</option>
                            <option value="BAJA">Baja</option>
                            <option value="MEDIA">Media</option>
                            <option value="ALTA">Alta</option>
                            <option value="URGENTE">Urgente</option>
                        </select>
                        <br />

                        <label>Completada: </label>
                        <input
                            type="checkbox"
                            checked={taskForm.completed}
                            onChange={(e) => {
                                setTaskForm({ ...taskForm, completed: e.target.checked });
                            }}
                        />
                        <br />
                        <br />

                        <button disabled={loading} type="submit">
                            {editingID !== null ? "Guardar Cambios" : "Crear"}
                        </button>

                        {editingID !== null && (
                            <button disabled={loading} type="button" onClick={reset}>
                                Cancelar
                            </button>
                        )}
                    </form>

                    <br /> <br />
                </div>

                {error && <p>{error}</p>}

                <div style={{ marginBottom: "20px" }}>
                    <label>Buscar: </label>
                    <input
                        type="text"
                        placeholder="Buscar por título, asignado a o prioridad"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        style={{ padding: "5px", width: "300px" }}
                    />
                </div>

                 <button disabled={loading} onClick={mostrarTasks}>
                    {loading ? "Loading" : "CARGAR TAREAS"}
                </button>

                <div style={{ display: "flex", gap: "40px" }}>
                    {tasks.length > 0 && (
                        <>
                            <br /> <br />
                            <table>
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort("id")}>
                                            ID
                                            <b style={{color: sortOrder === 'asc' ? 'red' : 'green', cursor:'pointer'}}>{sortBy === "id" && sortOrder === "asc" ? "↑" : "↓" }</b> 
                                        </th>
                                        <th onClick={() => handleSort("title")}>
                                            TÍTULO {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                                        </th>
                                        <th onClick={() => handleSort("assignedTo")}>
                                            ASIGNADO A {sortBy === "assignedTo" &&(sortOrder === "asc" ? "↑" : "↓")}
                                        </th>
                                        <th onClick={() => handleSort("priority")}>
                                            PRIORIDAD {sortBy === "priority" && (sortOrder === "asc" ? "↑" : "↓")}
                                        </th>
                                        <th>COMPLETADA</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedTasks.map((t) => (
                                        <tr key={t.id}>
                                            <td>{t.id}</td>
                                            <td>{t.title}</td>
                                            <td>{t.assignedTo}</td>
                                            <td>{t.priority}</td>
                                            <td>{t.completed ? "Sí" : "No"}</td>
                                            <td>
                                                <button
                                                    disabled={loading}
                                                    onClick={() => {mostrarTask(t.id); }}>Ver
                                                </button>

                                                <button
                                                    disabled={loading}
                                                    onClick={() => eliminar(t.id)}>❌
                                                </button>

                                                <button
                                                    disabled={loading}
                                                    onClick={() => {handleEdit(t); }} >✏️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    {task !== null && (
                        <>
                            <div style={{ border: "3px solid rgb(151, 252, 255)", margin: "15px", }}>
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
                    )}
                </div>

                <br /> <br />
               
            </div>
        </>
    );
}
export default Crud1;
