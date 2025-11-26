import { useState, type JSX } from "react";

type Tarea = {
    id: number;
    nombre: string;
    terminada: boolean;
}

function Lista4() :JSX.Element {

    const [texto, setTexto] = useState<string>("");

    const [tareas, setTareas] = useState<Tarea[]>([
        {id:1, nombre: "React", terminada: false},
        {id:2, nombre: "React Native", terminada: true},
        {id:3, nombre: "IPE", terminada: false},
    ]);

    const borrar = (id:number) : void => {
        setTareas(tareas.filter(t => t.id !== id));
    }

    const editar = (id:number) : void => {
        const nuevoNombre = prompt("Cambia el nombre de la tarea");
        if(!nuevoNombre) return;
        setTareas(tareas.map(t => t.id !== id ? t : {...t, nombre:nuevoNombre}));
    }

    const toggle = (id:number) : void => {
        setTareas(tareas.map(n => n.id !== id ? n : {...n, terminada: !n.terminada}));
    }

    const agregar = (nombreNuevo: string) : void =>{

        if(nombreNuevo.trim() === "") return;

        const maxID:number = tareas.reduce((max, t) => t.id > max ? t.id : max, 0);

        const nuevaTarea:Tarea = {id:maxID+1, nombre:nombreNuevo, terminada:false};

        setTareas([...tareas, nuevaTarea]);
        setTexto("");
    }

    return(
        <>
        <div style={{border: '5pc solid rgba(253, 0, 169, 0.75)'}}>

            <h1>Listas</h1>
            <h2>Primer ejecicio: checkar tareas</h2>

            {tareas.map(t => (
                <div style={{border: '3px solid rgba(26, 90, 109, 0.75)'}}>
                    <input 
                        type="checkbox" 
                        checked={t.terminada} 
                        onChange={()=>toggle(t.id)}
                        style={{textDecoration: t.terminada ? 'line-through' : 'none'}} />
                    <span>{t.nombre} ({t.id})</span>
                    <button onClick={()=>borrar(t.id)}>Borrar</button>
                    <button onClick={()=>editar(t.id)}>Editar</button>
                </div>
            ))}

            <h2>Segundo ejecicio: checkar tareas</h2>
            <input type="text" placeholder="Nombre de la tarea" value={texto} onChange={(e)=>{setTexto(e.target.value)}} />
            <br />
            <button onClick={()=>{agregar(texto)}}>Agregar tarea</button>

        </div>
        </>
    )
}

export default Lista4;