import { useState, type JSX } from "react";

type Prioridad = "baja" | "media" | "alta";
type Estado = "pendiente" | "en progreso" | "completada";

type Tarea = {
    id: number;
    titulo: string;
    prioridad: Prioridad;
    estado: Estado;
}

function GestorTarea(): JSX.Element {

    const [nuevoTitulo, setNuevoTitulo] = useState("");
    const [nuevaPrioridad, setNuevaPrioridad] = useState<Prioridad>("media");

    const [tareas, setTareas] = useState<Tarea[]>([
        { id: 1, titulo: "comer", prioridad: "media", estado: "en progreso" },
        { id: 2, titulo: "dormir", prioridad: "alta", estado: "pendiente" },
        { id: 3, titulo: "estudiar", prioridad: "baja", estado: "completada" }
    ]);

    const eliminarTarea = (id: number) => {
        setTareas(tareas.filter(t => t.id !== id));
    }

    const cambiarPrioridad = (id: number): void => {
        const nueva = prompt("nueva propiedad: baja, media o alta") as Prioridad;

        if (!["baja", "media", "alta"].includes(nueva)) return;

        setTareas(tareas.map(t => t.id !== id ? t : { ...t, prioridad: nueva }));
    }

    const cambiarEstado = (id: number): void => {
        const nueva = prompt("Nuevo estado \n en progreso, pendiente, completada") as Estado;

        if (!["en progreso", "pendiente", "completada"].includes(nueva)) return;

        setTareas(tareas.map(t => t.id !== id ? t : { ...t, estado: nueva }));
    }

    const cambiarNombre = (id: number): void => {
        const nueva = prompt("Nuevo nombre") as Estado;

        if (!nueva) return;

        setTareas(tareas.map(t => t.id !== id ? t : { ...t, titulo: nueva }));
    }

    const agregarTarea = (nombre: string, prioridadNueva: string): void => {

        if (nombre.trim() === "") return;
        if (!["baja", "media", "alta"].includes(prioridadNueva)) return;

        const maxId: number = tareas.reduce((max, t) => t.id > max ? t.id : max, 0);

        const nuevaTarea: Tarea = { id: maxId + 1, titulo: nombre, prioridad: prioridadNueva as Prioridad, estado: "pendiente" };

        setTareas([...tareas, nuevaTarea]);

        setNuevoTitulo("");
        setNuevaPrioridad("media");
    }

    return (
        <>
            <div style={{ border: '5px solid rgba(14, 119, 168, 1)', marginTop: '30px' }}>

                <h1>✔️ Ejercicio 5 – Gestor de tareas con prioridad y estado</h1>

                {tareas.map(t => (
                    <div key={t.id} style={{ padding: '10px', border: '2px solid #543', margin: '10px' }}>

                        <span className={t.prioridad}>{t.id}: {t.titulo} --- {t.prioridad}_{t.estado}</span>

                        <br />
                        <button className="eliminar" onClick={() => eliminarTarea(t.id)}>Eliminar</button>

                        <button onClick={() => cambiarNombre(t.id)}>Cambiar nombre</button>

                        <button onClick={() => cambiarPrioridad(t.id)}>Cambiar prioridad</button>

                        <button onClick={() => cambiarEstado(t.id)}>Cambiar estado</button>
                    </div>
                ))}

                <br /><br /><br />

                <h3>Añadir nueva Tarea</h3>

                <input type="text" placeholder="Nombre" value={nuevoTitulo} onChange={(e) => setNuevoTitulo(e.target.value)} />

                <input type="text" placeholder="Prioridad" value={nuevaPrioridad} onChange={(e) => setNuevaPrioridad((e.target.value) as Prioridad)} />

                <button onClick={() => agregarTarea(nuevoTitulo, nuevaPrioridad)}>Agregar</button>

            </div>
        </>
    )

}

export default GestorTarea;