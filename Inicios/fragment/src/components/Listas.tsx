import { useState } from "react";

function Listas() {

    const [tareas, setTareas] = useState([{ id: 1, texto: "Comprar pan", completada: true },
    { id: 2, texto: "Estudiar React", completada: false },
    { id: 3, texto: "Hacer ejercicio", completada: true }
    ]);

    const [nombreTarea, setNombreTarea] = useState<string>("");

    const [tareaEditando, setTareaEditando] = useState<number | null>(null);
    const [textoEditado, setTextoEditado] = useState("");

    function toggleTarea(id: number) {
        setTareas(tareas.map((t) =>
            /* coge todas las tareas y sobreescribe la propiedad de completada */
            (t.id === id ? { ...t, completada: !t.completada } : t)))
    }

    function agregarTarea(nombre: string) {

        let max = 0;
        tareas.map((t) => { max = (t.id > max ? t.id : max) });

        const nuevaTarea = { id: max + 1, texto: nombre, completada: false };
        setTareas([...tareas, nuevaTarea]);

    }

    function editar(id: number) {

        setTareas(tareas.map(t => t.id === id ? { ...t, texto: textoEditado } : t));

        setTareaEditando(null);
        setTextoEditado("");

    }

    function eliminarTarea(id: number) {
        setTareas(tareas.filter((t) => t.id !== id));
    }

    return (
        <>
            <h1>Listas</h1>

            <div>
                <h2>Lista de tareas</h2>

                {/* <ul>
                    {tareas?.map((t) =>
                        <li key={t.id}>
                            
                            {t.texto}
                            <input type="checkbox" checked={t.completada}
                                onChange={() => { toggleTarea(t.id) }}
                            />
                            <button style={{ width: '10px' }} onClick={() => {
                                const copiaTareas = [...tareas].splice(1);
                                setTareas(copiaTareas);
                            }}>❌</button>
                             <button style={{ width: '10px' }} onClick={() => {
                                setTareaEditando(t.id);
                    setTextoEditado(t.texto);
                            }}>Editar</button>
                        </li>)}
                </ul> */}



                <ul>
                    {tareas.map((t) => (
                        <li key={t.id}>
                            {tareaEditando === t.id ? (
                                // 👉 Si estamos editando esta tarea, mostramos un input y el botón Guardar
                                <>
                                    <input
                                        type="text"
                                        value={textoEditado}
                                        onChange={(e) => setTextoEditado(e.target.value)}
                                    />
                                    <button onClick={() => editar(t.id)}>Guardar</button>
                                </>
                            ) : (
                                // 👉 Si no está en modo edición, mostramos el texto normal
                                <>
                                    <span
                                        style={{
                                            textDecoration: t.completada ? "line-through" : "none",
                                        }}
                                    >
                                        {t.texto}
                                    </span>

                                    <input
                                        type="checkbox"
                                        checked={t.completada}
                                        onChange={() => toggleTarea(t.id)}
                                    />

                                    <button onClick={() => eliminarTarea(t.id)}>❌</button>

                                    <button
                                        onClick={() => {
                                            setTareaEditando(t.id);   // guardamos el id de la tarea a editar
                                            setTextoEditado(t.texto); // ponemos el texto actual en el input
                                        }}
                                    >
                                        Editar
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>




                <h2>Añadir una nueva tarea</h2>
                <input type="text" onChange={(e) => { setNombreTarea(e.target.value); }} />
                <button onClick={() => { agregarTarea(nombreTarea) }}>Agregar tarea</button>

            </div>
        </>
    );
}

export default Listas;