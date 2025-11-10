import { useState } from "react";

function ToDoListEntero(){

    // 1: CREAMOS UNA LISTA INICIAL 

    // definimos el tipo de datos que tendrá el array y su valor inicial es vacío
    // useState guarda un array de objetos, donde cada objeto es una tarea.
    const [tareas, setTareas] = useState <{ id: number; texto: string; completada: boolean }[]> (
                [
                    { id: 1, texto: "Comprar pan", completada: false}, 
                    { id: 2, texto: "Estudiar React", completada:true}
                ]);
    
    // 2: AÑADIR TOOGLE

    // “Toggle” en inglés significa alternar o cambiar entre dos estados.
    // Entonces, una función llamada toggleAlgo normalmente Cambia el valor de algo de true a false, o de false a true.

    function toggleTarea(id:number){
        // Recibe como parametro el id de la tarea que marcaste 

        setTareas(
            //Busca esa tarea (con el id indicado) dentro del array tareas.
            // Cambia su propiedad completada al opuesto usando
            tareas.map((tarea) => tarea.id !== id ? 
                                            // Si el id NO coincide, simplemente devolvemos la misma tarea (sin cambios)
                                            tarea :
                                            // Si SÍ coincide creamos una copia del objeto y cambiamos la propiedad completada
                                            // ...tarea → Crea un nuevo objeto, copiando todas las propiedades del objeto tarea
                                            // Dentro se está sobrescribiendo una de las propiedades.
                                            { ...tarea, completada: !tarea.completada})
        );
    }


    // 3: ELIMINAR TAREA

    function eliminarTarea(id:number){

        setTareas(
            // filter recorre el array tareas y devuelve un nuevo array con los elementos que cumplan la condición
            // no modifica el array original, siempre devuelve uno nuevo
            // los id distintos al id que queremos eliminar se mantienen en nuevo array
            tareas.filter((tarea)=> tarea.id !== id)
        );

    }

    // 4: EDITAR TAREA: 

    // creamos un estado de la tarea editando → nos dice cuál tarea está en modo edición

    // tareaEditando guarda el ID de la tarea que estamos editando
    // null → representa que no hay ninguna tarea en edición
    // null deja claro que al principio no hay ninguna tarea editándose

    // EN RESUMEN: 
    // Si le pasamos un number (el id de la tarea) → la tarea con ese id pasa a estar en edición.
    // Si le pasamos nada (un null) → ninguna tarea está en edición (modo normal).
    
    const [tareaEditando, setTareaEditando] = useState<number | null>(null);

    // creamos un estado del texto modificado → guarda el texto que vamos a modificar en el input
    const [textoEditado, setTextoEditado] = useState<string>("");

    function editarTarea(id:number){

        setTareas(
            // Si encuentra la tarea que estamos editando (a tráves de ID), reemplaza su texto por textoEditado
            tareas.map((tarea) => tarea.id !== id ? tarea : {...tarea, texto: textoEditado})
        );

        // nos permite guardar incluso si no hemos modificado nada en texto
        // es decir, damos click en ✏️, no modificamos finalmente nada, y hacemos click en 💾
        setTareaEditando(null);
        setTextoEditado("");

    }


    // 5: AGREGAR TAREAS

    // necesitamos nuevo estado del texto de nueva tarea
    // guarda el texto que el usuario está escribiendo
    const [textoTarea, setTextoTarea] = useState<string>("");

    function agregarTareas(texto:string){

        // en caso que la tarea es vacía 
        if(texto.trim() === "") return;

        // asignamos id
        // cada nueva tarea tiene que tener un id único y mayor que cualquier id existente en la lista.
        let idMAX = 0;
        tareas.forEach((tarea) => {
            if(tarea.id > idMAX) idMAX = tarea.id; 
        });

        const nuevaTarea = {id: idMAX + 1, texto: texto, completada:false};

        setTareas([...tareas, nuevaTarea]);

        // limpiamos el input
        setTextoTarea("");

    }


    return(
        <>
        <h1>To Do List 🌍🍃⭐</h1>

        <h3>Lo que incluye:</h3>
        <ol>
            <li>Mostrar tareas</li>
            <li>Añadir checkbox</li>
            <li>Eliminar tarea</li>
            <li>Editar tarea</li>
            <li>Agregar tarea</li>
        </ol>

         <br /><hr /><br />

        {/* 1: MOSTRAR TAREAS */}

        <ul>
            {/* Por cada elemento (objeto tarea) dentro del array tareas, crea un elemento <li> que muestre su texto */}
            {tareas.map ((tarea) => (
                /* key={tarea.id} Es un identificador único que React usa internamente para manejar eficientemente los elementos */
                <li key={tarea.id}>

                    {/* si tarea.completada es true, se muestra tachada. */}
                    <span style={{textDecoration: tarea.completada ? "line-through" : "none"}} >{tarea.texto}</span>

                    {/* 2: AÑADIMOS CHECKBOX DE TOOGLE TAREA */}

                    <input type="checkbox" 
                        // mantiene el checkbox sincronizado con el estado → el checkbox refleja el estado actual
                        checked={tarea.completada} 
                        // llamamos a la función con el id correcto de la tarea
                        onChange={()=>{toggleTarea(tarea.id)}} />

                    <br />

                    {/* 3: ELIMINAR TAREA */}
                    
                    <button style={{width: 1, backgroundColor:"#FE6244"}} onClick={()=> eliminarTarea(tarea.id)}>❎</button>


                    {/* 4: EDITAR TAREA */}

                    {/* al hacer clic en ✏️, el componente “sabe” que esa tarea ahora está en edición y prepara el input con su texto. */}
                    <button style={{width: 1, backgroundColor:"#BBC863"}} onClick={()=> {

                        // activa el modo edición para una tarea en concreto
                        setTareaEditando(tarea.id); 

                        // copia el texto actual de la tarea al estado textoEditado, para mostrarlo en el input editable
                        setTextoEditado(tarea.texto)
                        }}>✏️
                    </button>

                    {/* Solo muestra este bloque si la tarea actual está en modo edición */}
                    {/* Es decir, si tareaEditando es igual al id de esta tarea. */}

                    {tareaEditando === tarea.id && (
                        <>
                        {/* Solo se renderiza el input si la tarea actual coincide con tareaEditando. */}
                        <input type="text" 

                        // Muestra el texto que estamos editando (textoEditado)
                        value={textoEditado} 
                        
                        // onChange actualiza textoEditado mientras escribimos
                        onChange={(e)=> setTextoEditado(e.target.value)} />

                        {/* Llama a la función editarTarea para guardar los cambios en el array de tareas */}
                        <button onClick={()=> editarTarea(tarea.id)}>💾</button>

                        <br /><br />
                        </>
                    )}

                </li>
            ))
            }
        </ul>

        {/* 5: AGREGAMOS NUEVA TAREA */}

        <div>
            <input type="text" 
                   // el valor del input siempre refleja el estado textoTarea
                   // por tanto, al hacer click en 🅰️, React automaticamente vacía el input (con setTextoTarea("") de metodo)
                   value={textoTarea} 
                   
                   onChange={(e)=> {setTextoTarea(e.target.value)}} />

            <button style={{width: 1, backgroundColor:"#BDE3C3"}} onClick={()=>{agregarTareas(textoTarea)}}>🅰️</button>
        </div>

        </>
    );
}

export default ToDoListEntero;