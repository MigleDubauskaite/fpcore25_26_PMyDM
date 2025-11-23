import { useState, type JSX } from "react";
import './_1Contador.css'

// historial:
type ElementoHistorial = {
    id: number,
    valor: number,
    fecha: Date,
}

function _1Contador(): JSX.Element {

    // 1: contador:
    const [valor, setValor] = useState<number>(0);
    const [historial, setHistorial] = useState<ElementoHistorial[]>([
        { id: 1, valor: 0, fecha: new Date() }
    ]);


    function agregarHistorial(nuevoValor: number) {
        const maxID = historial.reduce((max, h) => (h.id > max ? h.id : max), 0);
        setHistorial([...historial, { id: maxID + 1, valor: nuevoValor, fecha: new Date() }])
    }

    function aumentarValor(n: number) {

        // evita valores negativos
        const nuevoValor = Math.max(valor + n, 0);
        setValor(nuevoValor);
        agregarHistorial(nuevoValor);

    }

    function resetValor() {

        setValor(0);
        agregarHistorial(0);
    }

    return (
        <>
            <div style={{ border: '3px solid #540863', padding: 20 }}>

                <div style={{ border: '3px solid #E49BA6', padding: 20, marginBottom: 20 }}>
                    <h1>Contador con historial</h1>
                    <h3>Contador: {valor} </h3>

                    <button onClick={() => { aumentarValor(-1) }}>➖</button>
                    <button onClick={() => { resetValor() }}>⭕</button>
                    <button onClick={() => { aumentarValor(1) }}>➕</button>
                </div>

                <div style={{ border: '3px solid #E49BA6', padding: 20 }}>
                    <h3>Histórico del contador: </h3>

                    <ul>
                        {historial.map(h =>
                            <li key={h.id}>
                                {h.id} → {h.valor} → {h.fecha.toLocaleString()}
                            </li>
                        )}
                    </ul>

                </div>
            </div>
        </>
    );
}

export default _1Contador;