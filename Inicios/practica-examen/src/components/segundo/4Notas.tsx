import { useState } from "react";

type Nota = {
    id: number,
    asignatura: string,
    nota: number
}

function Notas(){

    const [asignatura, setAsignatura] = useState<string>("");
    const [nota, setNota] = useState<string>("");
    const [notasIntroducidas, setNotasIntroducidas] = useState<Nota[]>([]);

    const agregar = (): void => {

        const notaIntroducida = Number (nota);

        if(asignatura.trim() === "" || nota.trim() === "") return;
        if(isNaN(notaIntroducida) || notaIntroducida < 0 || notaIntroducida > 10) return;

        const maxId = notasIntroducidas.reduce((max, n) => n.id > max ? n.id : max, 0);

        const nuevaNota : Nota = {id: maxId+1, nota: notaIntroducida, asignatura}

        setNotasIntroducidas([...notasIntroducidas, nuevaNota]);                                 

        setAsignatura("");
        setNota("");

    }

    const eliminar = (id:number): void => {
        setNotasIntroducidas(notasIntroducidas.filter(n => n.id !== id))
    }

    const notaMedia = notasIntroducidas.length ? notasIntroducidas.reduce((suma, n) => suma + n.nota, 0) : 0;
   
    return(
        <>
        <div style={{border: '5px solid #7e58d6ff'}}>

            <h1>Tabla de notas con media</h1>

            <input 
                type="text"
                placeholder="Nombre asignatura"
                value={asignatura}
                onChange={(e)=>{setAsignatura(e.target.value)}} />
            
            <input
                type="number" 
                placeholder="Nota (0-10)" 
                value={nota}
                onChange={(e)=>{setNota (e.target.value)}} />
            
            <button onClick={()=>{agregar()}}>Agregar</button>

            <table>
                <thead>
                    <tr>
                        <th>ASIGNATURA</th>
                        <th>NOTA</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {notasIntroducidas.map(n => (
                        <tr key={n.id}>
                            <td>{n.asignatura}</td>
                            <td>{n.nota}</td>
                            <td><button onClick={()=>{eliminar(n.id)}}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Nota media: {notaMedia.toFixed(2)}</h3>

            {notasIntroducidas.length === 0 && <p>No hay ninguna nota disponible</p>}


        </div>
        </>
    );

}

export default Notas;