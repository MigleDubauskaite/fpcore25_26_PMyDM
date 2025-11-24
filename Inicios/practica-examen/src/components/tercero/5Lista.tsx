import { useState } from "react";

type Tarea = {
    id: number,
    nombre: string
    terminada: boolean
}

function Lista3(){

    const [tareas, setTareas] = useState<Tarea[]>([
        {id: 1, nombre: "React", terminada: false},
        {id: 2, nombre: "Spring Boot", terminada: true},
        {id: 3, nombre: "Java", terminada: false}
    ]);

    const [nombre, setNombre] = useState<string>("");

    const toggleTarea = (id:number) : void =>{
        setTareas(tareas.map(n => n.id !== id ? n : {...n, terminada: !n.terminada}));
    }

    const borrar = (id:number) : void => {
        setTareas(tareas.filter(n => n.id !== id));
    }

    const cambiarNombre = (id:number) : void => {
        
        const nuevoNombre = prompt("Cambia el nombre de la tarea: ");
        if(!nuevoNombre) return;

        setTareas(tareas.map(n => n.id !== id ? n : {...n, nombre: nuevoNombre}));
    } 

    const agregarTarea = (nombre: string) : void => {

        const maxId = tareas.reduce((max, t) => t.id > max ? t.id : max, 0);

        const nuevaTarea: Tarea = {id: maxId+1, nombre: nombre, terminada:false};

        setTareas([...tareas, nuevaTarea]);
        setNombre("");
    }

    return(
        <>
        <div style={{border:'5px solid rgba(153, 84, 223, 1)'}}>

            <h2>Listas</h2>
            <h3>Primer ejemplo: checkar tareas</h3>

            {tareas.map(n => (
                <ul key={n.id}>
                    <div style={{border:'2px solid rgba(29, 48, 54, 1)', textDecoration: n.terminada ? 'line-through' : 'none'}} >
                        <input 
                            type="checkbox"
                            checked={n.terminada}
                            style={{textDecoration: n.terminada ? 'line-through' : 'none'}}
                            onChange={()=>{toggleTarea(n.id)}}
                              />
                        {n.id}: {n.nombre}
                        <button onClick={()=>borrar(n.id)}>Borrar</button>
                        <button onClick={()=>cambiarNombre(n.id)}>Cambiar nombre</button>
                    </div>
                </ul>
            ))}

            <h3>Segundo ejemplo: agregar tareas</h3>
            <input 
                type="text"
                placeholder="Nombre de la tarea..."
                value={nombre}
                onChange={(e)=>{setNombre(e.target.value)}}
                 />

            <button onClick={()=>{agregarTarea(nombre)}}>Agregar</button>

        </div>
        </>
    )
}

export default Lista3;