import axios from "axios";
import { useState } from "react";

interface Task {
    id: string;
    title:string;
    assignedTo: string;
    priority:string;
    completed: boolean;
}

interface TaskForm {
    title:string;
    assignedTo: string;
    priority:string;
    completed: boolean;
}

function Crud1(){

    const BASE_URL = 'https://6964d6aee8ce952ce1f34164.mockapi.io/api/tasks';

    const [error, setError] = useState<null|string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<null|Task>(null);

    const taskFormBlanco:TaskForm = {title:'', assignedTo:'', priority:'', completed:false}; 
    const [taskForm, setTaskForm] = useState(taskFormBlanco);

    /* 1: MOSTRAR  */
    const mostrarTasks = async()=>{

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get<Task[]>(BASE_URL);
            setTasks(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar los usuarios');
        } finally{
            setLoading(false);
        }
    }

    /* 2: MOSTRAR UN TASK */
    const mostrarTask = async(id:string) =>{

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get<Task>(`${BASE_URL}/${id}`);
            setTask(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar el usuarios');
        } finally{
            setLoading(false);
        }
    }

    /* 3:  ELIMINAR*/
    const eliminar = async(id:string) =>{

        if(!window.confirm(`Seguro que quieres borrar el task con id ${id}?`)) return;

        setLoading(true);
        setError(null);

        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error(error);
            setError('Error al eliminar el usuarios');
        } finally{
            setLoading(false);
        }
    }

    /* 4: CREAR */
    const crearTask = async(form: TaskForm)=>{
        
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<Task>(BASE_URL, form);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error(error);
            setError('Error al crear el usuario nuevo');
        } finally{
            setLoading(false);
        }
    }

    return(
        <>
        <div style={{border:'5px solid rgb(191, 255, 151)'}}>

            <h1>CRUD: TASKS 1</h1>

            <div>
                <h2>Formulario de tareas</h2>
                
                <form>
                    <label>ID</label>
                </form>
            </div>

            {error && <p>{error}</p>}

            {task !== null && 
                <>
                <div style={{border:'3px solid rgb(151, 252, 255)', margin: '15px'}}>
                    <ul>
                        <li>{task.id}</li>
                        <li>{task.title}</li>
                        <li>{task.assignedTo}</li>
                        <li>{task.priority}</li>
                        <li>{task.completed}</li>
                    </ul>
                    <button onClick={()=>setTask(null)}>Ocultar</button>
                </div>
                </>
            }

            <button disabled={loading} onClick={mostrarTasks}>CARGAR TAREAS</button>

            {tasks.length > 0 && 
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TÍTULO</th>
                            <th>ASIGNADO A</th>
                            <th>PRIORIDAD</th>
                            <th>COMPLETADA</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(t => (
                            <tr key={t.id}>
                                <td>{t.id}</td>
                                <td>{t.title}</td>
                                <td>{t.assignedTo}</td>
                                <td>{t.priority}</td>
                                <td>{t.completed ? 'Sí' : 'No'}</td>
                                <td>
                                    <button disabled={loading} onClick={()=>{mostrarTask(t.id)}}>Ver</button>
                                    <button disabled={loading} onClick={()=>eliminar(t.id)}>❌</button>
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

export default Crud1;