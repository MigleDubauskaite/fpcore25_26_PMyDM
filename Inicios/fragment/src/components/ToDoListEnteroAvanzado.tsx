import { useState } from "react";

function ToDoListEnteroAvanzado() {

    const [tareas, setTareas] = useState<
        { id: number, nombre: string, prioridad: string, realizada: boolean, descripcion: string, deadline: number }[]>
        ([
            { id: 1, nombre: "Estudiar React", prioridad: "media", realizada: false, descripcion: "", deadline: 3 },
            { id: 2, nombre: "Estudiar React Native", prioridad: "baja", realizada: false, descripcion: "", deadline: 3 },
            { id: 3, nombre: "Estudiar Spring boot", prioridad: "alta", realizada: true, descripcion: "", deadline: 3 }
        ]);

    // CHECKBOX:
    function toggleTarea(id: number) {

        setTareas(tareas.map((tarea) =>
            tarea.id !== id ? tarea : { ...tarea, realizada: !tarea.realizada }
        ));
    }

    // EDITAR:

    const [nombreEditado, setNombreEditado] = useState<string>("");
    const [tareaEstaEnModoEdicion, setTareaEstaEnModoEdicion] = useState<number | null>(null); // nulo si no la edita

    function editar(id: number) {

        setTareas(tareas.map((tarea) => tarea.id !== id ? tarea : { ...tarea, nombre: nombreEditado }));

        setNombreEditado("");
        setTareaEstaEnModoEdicion(null);
    }

    // ELIMINAR:

    function eliminar(id: number) {

        setTareas(tareas.filter((tarea) => tarea.id !== id));
    }

    // AGREGAR:
    const [nombreTareaNueva, setNombreTareaNueva] = useState<string>("");
    const [prioridad, setPrioridad] = useState<string>("");

    function agregar(nombre: string, prioridad: string) {

        let maxIndice = 0;

        tareas.forEach((tarea) => {
            tarea.id > maxIndice ? maxIndice = tarea.id : maxIndice;
        });

        const nuevaTarea = { id: maxIndice + 1, nombre: nombre, prioridad: prioridad, realizada: false, descripcion: "", deadline: 2 };

        setTareas([...tareas, nuevaTarea]);

        setNombreTareaNueva("");
        setPrioridad("");

    }

    return (
        <>
            <h1>To Do List con más funciones</h1>
            <a href="https://chatgpt.com/share/69123bea-1ce0-8007-8253-0705595c3e80">Enunciado</a>

            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.id}>
                        <span style={{ textDecoration: tarea.realizada ? "line-through" : "" }}>{tarea.nombre} </span>
                        <span style={{ color: tarea.prioridad === 'alta' ? 'red' : tarea.prioridad === 'baja' ? 'green' : tarea.prioridad === 'media' ? 'orange' : '' }}>{tarea.prioridad}</span>
                        <input type="checkbox" checked={tarea.realizada} onChange={() => { toggleTarea(tarea.id) }} />

                        <button onClick={() => {
                            setTareaEstaEnModoEdicion(tarea.id);
                            setNombreEditado(tarea.nombre);
                        }}>✏️</button>

                        {tareaEstaEnModoEdicion === tarea.id && (
                            <>
                                <input type="text" value={nombreEditado} onChange={(e) => setNombreEditado(e.target.value)} />
                                <button onClick={() => { editar(tarea.id) }}>💾</button>
                            </>
                        )}

                        <button onClick={() => { eliminar(tarea.id) }}>❌</button>

                    </li>
                ))}

            </ul>

            <input type="text" onChange={(e) => { setNombreTareaNueva(e.target.value) }} /> 

            <input type="radio" name="prioridad" value={'alta'} checked={prioridad === 'alta'} onChange={(e)=>{setPrioridad(e.target.value)}} /> <span>alta</span>
            <input type="radio" name="prioridad" value={'media'} checked={prioridad === 'media'} onChange={(e)=>{setPrioridad(e.target.value)}} /> <span>media</span>
            <input type="radio" name="prioridad" value={'baja'} checked={prioridad === 'baja'} onChange={(e)=>{setPrioridad(e.target.value)}} /> <span>baja</span>
            <br />
           
            <button onClick={() => { agregar(nombreTareaNueva, prioridad) }}>💾</button>


        </>
    );
}

export default ToDoListEnteroAvanzado;