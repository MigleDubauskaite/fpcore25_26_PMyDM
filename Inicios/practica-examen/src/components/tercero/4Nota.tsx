import { useState, type JSX } from "react";

type valoresNota = {
    id: number,
    asignatura: string,
    nota: number,
}

function Nota3(): JSX.Element {

    const [asignatura, setAsignatura] = useState<string>("");
    const [nota, setNota] = useState<string>("");
    const [todasNotas, setTodasNotas] = useState<valoresNota[]>([]);

    const agregar = (): void => {

        const notaAsignatura = Number(nota);

        if (asignatura.trim() === "" || nota.trim() === "") return;
        if (notaAsignatura < 0 || notaAsignatura > 10) return;

        const maxId = todasNotas.reduce((max, n) => n.id > max ? n.id : max, 0);

        const nuevaNota: valoresNota = {
            id: maxId + 1,
            asignatura,
            nota: notaAsignatura
        };

        setTodasNotas([...todasNotas, nuevaNota]);
        setAsignatura("");
        setNota("");
    }

    const eliminar = (id: number): void => {
        setTodasNotas(todasNotas.filter(n => n.id !== id));
    }

    const notaMedia = todasNotas.length ? todasNotas.reduce((suma, n) => suma + n.nota, 0) / todasNotas.length : 0;

    return (
        <>
            <div style={{ border: '5px solid rgba(238, 83, 22, 0.92)' }}>

                <h2>Tabla de notas con media</h2>

                <input
                    type="text"
                    placeholder="Nombre asignatura"
                    value={asignatura}
                    onChange={(e) => { setAsignatura(e.target.value) }} />

                <input
                    type="number"
                    placeholder="Nota (0-10)"
                    value={nota}
                    onChange={(e) => { setNota(e.target.value) }} />

                <button onClick={() => { agregar() }}>Agregar</button>

                <table>
                    <thead>
                        <tr>
                            <th>ASIGNATURA</th>
                            <th>NOTA</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todasNotas.map(n => (
                            <tr key={n.id}>
                                <td>{n.asignatura}</td>
                                <td>{n.nota}</td>
                                <td><button onClick={() => eliminar(n.id)}>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p>Nota media: {notaMedia.toFixed(2)}</p>

                {!notaMedia && <p>No hay datos suficientes para calcular una media</p>}

            </div>
        </>
    );

}

export default Nota3;