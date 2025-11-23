import { useState, type JSX } from "react";

import './_4TablaNotas.css';

type Nota = {
    id: number;
    asignatura: string;
    nota: number;
}

function _4TablaNotas(): JSX.Element {

    const [asignatura, setAsignatura] = useState<string>("");
    const [nota, setNota] = useState<string>("");
    const [notas, setNotas] = useState<Nota[]>([]);

    /*
    reduce es un método de los arrays que sirve para reducir una lista de valores a un único resultado
    */

    // 1. Suma todas las notas usando reduce
    // 2. Divide la suma entre el número de elementos
 
    const notaMedia = 
        notas.length ? notas.reduce((suma, n) => suma + n.nota, 0) / notas.length : 0;

    const agregarNota = ():void => {

        const notaNum = Number(nota); 

        // aseguramos que no entre asignatura || nota vacía
        if(asignatura.trim() === "" || nota.trim() === "") return;

        // aseguramos que sea un numero entre 0 y 10
        if(isNaN(notaNum) || notaNum < 0 || notaNum > 10) return;

       // let max = notas.reduce((max, n) => Math.max(max, n.id), 0);
        const max = notas.reduce((max, n) => n.id > max ? n.id : max, 0);

        const nuevaNota: Nota = {
            id: max + 1,
            asignatura,
            nota: notaNum
        }

        setNotas([...notas, nuevaNota]);
        setAsignatura("");
        setNota("");
    }

    const eliminarNota = (id: number): void => {
        setNotas(notas.filter(n => n.id !== id))
    }


    return (
        <>
            <div style={{ marginTop: '50px', border: '4px solid red' }}>

                <h1>Tabla de notas con media</h1>

                <input 
                    type="text" 
                    placeholder="Nombre asignatura"
                    value={asignatura} 
                    onChange={(e)=>{setAsignatura(e.target.value)}}/>

                <input 
                    type="number" 
                    placeholder="Nota (0-10)"
                    value={nota}
                    onChange={(e) => {setNota(e.target.value)}}
                />

                <button onClick={agregarNota}>Agregar</button>

                <table style={{ border: '2px solid green' }}>
                    <thead>
                        <tr>
                            <th>Asignatura</th>
                            <th>Nota</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map((n) => (
                        <tr key={n.id}>
                            <td>{n.asignatura}</td>
                            <td>{n.nota}</td>
                            <td><button onClick={()=>{eliminarNota(n.id)}}>Eliminar</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Nota media {notaMedia.toFixed(2)}</h2>

                {notas.length === 0 && <p>No hay asignaturas</p>}

            </div>

        </>
    );

}

export default _4TablaNotas;