import { useState } from "react";
import type { JSX } from "react/jsx-runtime";

type Historial = {
    id: number,
    valor: number,
    fecha: Date,
}

function Contador() : JSX.Element {

    const [valor, setValor] = useState<number>(0);
    const [historial, setHistorial] = useState<Historial[]>([]);

    function agregarHistorial(newValor: number) {

        const maxId = historial.reduce((max, h) => h.id > max ? h.id : max, 0);

        const nuevoValor = {
            id: maxId + 1,
            valor: newValor,
            fecha: new Date()
        }

        setHistorial([...historial, nuevoValor]);

    }

    function cambioValor(valorIntroducido: number) {

        const nuevoValor = Math.max(valorIntroducido + valor, 0);
        setValor(nuevoValor);
        agregarHistorial(nuevoValor);
    }

    function resetValor() {
        setValor(0);
        agregarHistorial(0);
    }

    return (
        <>
            <div style={{border: '5px solid green'}}>
                <h1>Contador con historia [1]</h1>

                <h3>Contador: {valor} </h3>

                <button onClick={() => { cambioValor(-1) }}>➖</button>
                <button onClick={() => { resetValor() }}>⭕</button>
                <button onClick={() => { cambioValor(1) }}>➕</button>

                <h3>Histórico del contador</h3>
                <ul>
                    {historial.map(h => (
                        <li key={h.id}>
                            {h.id} -- {h.valor} -- {h.fecha.toLocaleString()}
                        </li>
                    ))}
                </ul>

                <p>Cantidad de elementos del histórico: {historial.length}</p>

            </div>

        </>
    );

}


export default Contador;