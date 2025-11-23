import { useState, type JSX } from "react";

type Tarea = {
    id: number,
    nombre: string,
    terminada: boolean
}

function Lista() : JSX.Element{

    const [nombreTarea, setNombreTarea] = useState<string>("");

    const [tareas, setTareas] = useState<Tarea[]>([
        { id: 1, nombre: "Deporte", terminada: false },
        { id: 2, nombre: "React", terminada: true },
        { id: 3, nombre: "Leer", terminada: false }
    ]);

    const toggle = (id: number): void => {
        setTareas(tareas.map(tarea => tarea.id !== id ? tarea : { ...tarea, terminada: !tarea.terminada }));
    }

    const editar = (id: number) : void => {

        const tareaEditada = prompt("Introduce tarea");
        if(!tareaEditada) return;

        setTareas (tareas.map (t => t.id !== id ? t : {...t, nombre: tareaEditada} ));
    }

    const eliminar = (id:number): void => {
        setTareas(tareas.filter(t => t.id !== id));
    }

    const agregar = (nombreNuevo:string) : void => {

        const maxId = tareas.reduce((max, t)  => t.id > max ? t.id : max, 0);

        const nuevaTarea = {
            id: maxId+1,
            nombre: nombreNuevo,
            terminada: false
        }

        setTareas([...tareas, nuevaTarea]);
        setNombreTarea("");

    }

    return (
        <>
            <div style={{ border: '5px solid grey' }}>

                <h1>Listas</h1>
                <h2>Primer ejemplo: checkar tareas</h2>

                <ul>
                    {tareas.map(n => (
                        <li key={n.id}>
                            <input
                                type="checkbox" 
                                checked={n.terminada}
                                onChange={()=>toggle(n.id)} />

                            <span style={{textDecoration: n.terminada ? "line-through" : "none"}}>{n.nombre}: {n.id}</span>
                            <button onClick={()=>eliminar(n.id)}>Borrar</button>
                            <button onClick={()=>editar(n.id)}>Cambiar nombre</button>
                        </li>
                    ))}
                </ul>
                
                <br /><br />
                <h2>Segundo ejemplo: agregar tareas</h2>

                <input 
                    type="text" 
                    value={nombreTarea}
                    placeholder="Nombre de la tarea..." 
                    onChange={(e)=> setNombreTarea(e.target.value)}/>
               
                <br />
                <button onClick={()=>agregar(nombreTarea)}>Agregar tarea</button>

            </div>
        </>
    );
}

export default Lista;