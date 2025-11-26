import { useState, type JSX } from "react";

type Elemento = {
    id:number;
    tarea:string;
    terminada:boolean;
}

function Lista() : JSX.Element {

    const [nombreTarea, setNombreTarea] = useState<string>("");

    const [tareas, setTareas] = useState<Elemento[]>([
        {id:1, tarea: "Comprar pan", terminada:false},
        {id:2, tarea: "Ver pelicula", terminada:true},
    ]);

    const toggle = (id:number) : void => {
        setTareas(tareas.map(t => t.id !== id ? t : {...t, terminada: !t.terminada}));
    }

    const borrar = (id:number) : void => {
        setTareas(tareas.filter(t => t.id !== id));
    }

/*     const cambiarNombreInput = (id:number, nombreNuevo:string) : void => {
        setTareas(tareas.map(t => t.id !== id ? t : {...t, tarea:nombreNuevo}));
    } */

    const cambiarNombre= (id:number) : void => {
        const nuevoNombre:string|null = prompt("Nuevo nombre");
        if(!nuevoNombre) return;
        setTareas(tareas.map(t => t.id !== id ? t : {...t, tarea:nuevoNombre}));
    }

    const agregar = (nuevoNombre:string) : void => {

        if(nuevoNombre.trim()==="") return;

        const maxId = tareas.reduce((max, t) => t.id > max ? t.id : max, 0);
        const nuevaTarea = {id:maxId+1, tarea:nuevoNombre, terminada:false};

        setTareas([...tareas, nuevaTarea]);
        setNombreTarea("");
    }

    return(
        <>
        <div style={{ border: '5px solid #654', marginTop: '30px' }}>

            <h1>Listas</h1>

            <h2>Primer ejemplo: checkar tareas</h2>

            {tareas.map(t => (
                <div key={t.id} style={{ border: '1px solid #654', marginTop: '30px', padding:'10px' }}>
                    <input type="checkbox" onChange={()=>toggle(t.id)} />
                    <span style={{textDecoration: t.terminada ? 'line-through' : 'none'}}>{t.tarea} ({t.id})</span>
                    <button className="eliminar" onClick={()=>borrar(t.id)}>Borrar</button>
                    <button onClick={()=>cambiarNombre(t.id)}>Cambiar nombre</button>
                </div>
            ))}

            <h2>Segundo ejemplo: agregar tareas</h2>
            <input type="text" placeholder="Nombre de tarea..." 
                onChange={(e)=>setNombreTarea(e.target.value)}
                value={nombreTarea} />
            <br />
            <button onClick={()=>agregar(nombreTarea)}>Agregar</button>

        </div>
        </>
    )
}

export default Lista;