import { useState } from "react";

function TodoListComponent() {

    const [tareas, setTareas] = useState<string[]>([]);

    const [nuevaTarea, setNuevaTarea] = useState<string>("");

    function addTarea() {

        if (nuevaTarea.trim() === "") return;

        setTareas([...tareas, nuevaTarea]);
        setNuevaTarea(""); // limpiamos el input

    }

    return (
        <>
            <h2>6: To Do List</h2>

            <form action="">
                <input placeholder="Añade una tarea" value={nuevaTarea} onChange={(e) => { setNuevaTarea(e.target.value) }} />
            </form>
            <button onClick={() => { addTarea() }}>Añadir nueva tarea</button>
            <ol>
                {tareas.map((tarea, indice) => (
                    // tarea: es el valor que queremos mostrar en pantalla
                    // es la “clave” (key) que React usa internamente para identificar este elemento de la lista
                    <li key={indice}>{tarea}
                        <button onClick={() => {
                            const copiaTareas = [...tareas];
                            copiaTareas.splice(indice, 1);
                            setTareas(copiaTareas);
                        }}>❌</button> </li>
                ))}
            </ol>

        </>
    );
}

export default TodoListComponent;