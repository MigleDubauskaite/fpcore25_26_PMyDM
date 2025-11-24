import { useState, type JSX } from "react";

type Valor = {
    id: number,
    valor: number,
    tiempo: Date,
}

function Contador4(): JSX.Element {

    const [valor, setValor] = useState<number>(0);
    const [historial, setHistorial] = useState<Valor[]>([]);

    const agregarHistorial = (nuevoValor: number): void => {

        const maxID = historial.reduce((max, n) => n.id > max ? n.id : max, 0);
        const nuevo = { id: maxID + 1, valor: nuevoValor, tiempo: new Date() };
        setHistorial([...historial, nuevo]);
    }

    const cambiarValor = (valorC: number): void => {

        const valorCambiado = valor + valorC;
        setValor(valorCambiado);
        agregarHistorial(valorCambiado);
    }

    const reset = (): void => {
        setHistorial([{ id: 1, valor: 0, tiempo: new Date() }]);
        setValor(0);
    }

    return (
        <>
            <div style={{ border: '5px solid rgba(255, 0, 0, 0.27)' }}>

                <h1>Contador con historia</h1>
                <h2>Contador: {valor}</h2>
                <button onClick={() => cambiarValor(-1)}>➖</button>
                <button onClick={() => reset()}>⭕</button>
                <button onClick={() => cambiarValor(1)}>➕</button>

                <h2>Histórico del contador</h2>
                <ul>
                    {historial.map(n => (
                        <li key={n.id}>
                            [ID {n.id}]: {n.valor} --- {n.tiempo.toLocaleString()};
                        </li>
                    ))}
                </ul>

                <p>Cantidad de elementos del histórico: <strong>{historial.length}</strong></p>

            </div>
        </>
    );

}

export default Contador4;