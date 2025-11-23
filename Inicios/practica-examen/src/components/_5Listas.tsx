import { useState } from "react";
import type { JSX } from "react/jsx-runtime";

type Tarea = {
    id: number,
    texto: string,
    completada: boolean
}

function _5Listas(): JSX.Element {

    const [nombreTarea, setNombreTarea] = useState("");

    const [tareas, setTareas] = useState<Tarea[]>([
        { id: 1, texto: 'Comprar pan', completada: true },
        { id: 2, texto: 'Estudiar React', completada: false },
        { id: 3, texto: 'Hacer ejercicio', completada: true }
    ]);

    function toggleTarea(id: number) {
        setTareas(tareas.map(t => t.id !== id ? t : { ...t, completada: !t.completada }));
    }

    function agregarTarea(nombre: string) {

        if (nombre.trim() === "") return;

        const maxId = tareas.reduce((max, t) => t.id > max ? t.id : max, 0);
        const nuevaTarea: Tarea = {
            id: maxId + 1,
            texto: nombre,
            completada: false,
        }

        setTareas([...tareas, nuevaTarea]);
        setNombreTarea("");
    }

    function borrarTarea(id: number) {
        setTareas(tareas.filter(t => t.id !== id));
    }

    function editarTarea(id: number) {

        const nuevoNombre = prompt("Nuevo nombre de la tarea");
        // Si el usuario cancela o deja vacío, no hacemos nada
        if (!nuevoNombre) return; 
        setTareas(tareas.map(t => t.id === id ? { ...t, texto: nuevoNombre } : t));

    }

    return (
        <>
            <div style={{ border: '5px solid yellow', marginTop: '50px' }}>

                <h1>Listas</h1>
                <h2>Primer ejemplo: checkar tareas</h2>

                <ul>
                    {tareas.map((t) => (
                        <li key={t.id}>
                            <input 
                                type="checkbox"
                                checked={t.completada}
                                onChange={()=>{toggleTarea(t.id)}}
                            />
                            {t.texto}

                            <button onClick={()=>borrarTarea(t.id)}>Borrar</button>
                            <button onClick={()=> editarTarea(t.id)}>Editar</button>
                        </li>
                    ))}
                </ul>

                <div style={{marginTop: '20px'}}>
                    <h2>Segundo ejemplo: agregar tareas</h2>
                    <input 
                        type="text"
                        placeholder="Nombre de la tarea"
                        onChange={(e)=>{setNombreTarea(e.target.value)}} />

                    <br />
                    <button onClick={()=>{agregarTarea(nombreTarea)}}>Agregar</button>
                </div>

            </div>
        </>
    );
}
export default _5Listas;