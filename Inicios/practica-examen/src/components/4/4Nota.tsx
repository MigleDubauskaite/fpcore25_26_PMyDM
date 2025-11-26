import { useState, type JSX } from "react";

type Nota = {
    id: number;
    asignatura: string;
    nota: number;
}

function Nota4(): JSX.Element {

    const [asignatura, setAsignatura] = useState<string>("");
    const [nota, setNota] = useState<string>("");

    const [notas, setNotas] = useState<Nota[]>([
        { id: 1, asignatura: "React", nota: 9 },
        { id: 2, asignatura: "Spring Boot", nota: 8 },
        { id: 3, asignatura: "SGE", nota: 10 },
    ]);

    const agregar = (): void => {

        const valorNota = Number(nota);
        const maxID = notas.reduce((max, n) => n.id > max ? n.id : max, 0);

        if (isNaN(valorNota) || nota.trim() === "" || asignatura.trim() === "") return;
        if (valorNota < 0 || valorNota > 10) return;

        const nuevaNota: Nota = { id: maxID + 1, asignatura, nota: valorNota };

        setNotas([...notas, nuevaNota]);
        setAsignatura("");
        setNota("");
    }

    const eliminar = (id: number): void => {
        setNotas(notas.filter(n => n.id !== id));
    }

    const notaMedia:number = notas.length ? notas.reduce((suma, n) => suma + n.nota, 0) / notas.length : 0;

    return (
        <>
            <div style={{ border: '5px solid rgba(102, 127, 209, 1)' }}>

                <h1>Tabla de notas con media</h1>

                <input
                    type="text"
                    placeholder="Nombre asignatura"
                    value={asignatura}
                    onChange={(e) => { setAsignatura(e.target.value) }} />

                <input
                    type="number"
                    placeholder="Nota (0-10)"
                    value={nota}
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => { setNota(e.target.value) }} />

                <button onClick={() => { agregar() }}>Agregar</button>

                <br /><br />

                <table>
                    <thead>
                        <tr>
                            <th>ASIGNATURA</th>
                            <th>NOTA</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map(n => (
                            <tr key={n.id}>
                                <td>{n.asignatura}</td>
                                <td>{n.nota}</td>
                                <td><button onClick={() => eliminar(n.id)}>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p>Nota media: <strong>{notaMedia.toFixed(2)}</strong> </p>

                {notas.length === 0 && <p>No hay suficientes datos para calcular la media...</p>}

            </div>
        </>
    )
}

export default Nota4;