import { useState, type JSX } from "react";

type Nota = {
    id:number;
    asignatura:string;
    nota:number;
}

function TablaNotas(): JSX.Element {

    const [asignatura, setAsignatura] = useState<string>("");
    const [nota, setNota] = useState<string>("");

    const [notas, setNotas] = useState<Nota[]>([
        {id:1, asignatura: "N", nota:3 },
        {id:2, asignatura: "T", nota:8 },
    ]);

    const agregar = () : void => {

        const notaNueva = Number(nota);

        if(notaNueva < 0 || notaNueva > 10) return;
        if(nota.trim()==="" || asignatura.trim()==="") return;

        const maxId = notas.reduce((max, n) => n.id > max ? n.id : max, 0);
        const nuevaTarea = {id:maxId+1, asignatura, nota:notaNueva};
        setNotas([...notas, nuevaTarea]);

        setAsignatura("");
        setNota("");
    }

    const eliminar = (id:number) : void => {
        setNotas(notas.filter(n => n.id !== id));
    }

    return (
        <>
            <div style={{ border: '5px solid #654', marginTop: '30px' }}>
                <h1>Tabla de notas con media</h1>

                <input type="text" placeholder="Nombre de asignatura" onChange={(e)=>setAsignatura(e.target.value)} value={asignatura} />
                <input type="number" placeholder="Nota(0-10)" onChange={(e)=>setNota(e.target.value)} value={nota} />
                <button onClick={()=>agregar()}>Agregar</button>

                <table>
                    <thead>
                        <tr>
                            <th>ASIGNATURA</th>
                            <th>NOTA</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map((n) => (
                            <tr key={n.id}>
                                <td>{n.asignatura}</td>
                                <td>{n.nota}</td>
                                <td><button className="eliminar" onClick={()=>eliminar(n.id)}>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default TablaNotas;