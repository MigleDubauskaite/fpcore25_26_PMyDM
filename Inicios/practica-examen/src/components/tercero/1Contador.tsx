import { useState, type JSX } from "react";

type Numero = {
    id: number,
    valor: number,
    fecha: Date,
}

function Contador3(): JSX.Element {

    const [valor, setValor] = useState<number>(0);
    const [valoresHistorial, setValoresHistorial] = useState<Numero[]>([]);

    const agregarHistorial = (valorNuevo: number): void => {

        const maxID = valoresHistorial.reduce((max, v) => v.id > max ? v.id : max, 0);

        const nuevoValor = { id: maxID + 1, valor: valorNuevo, fecha: new Date() };

        setValoresHistorial([...valoresHistorial, nuevoValor]);
    }

    const cambiarValor = (valorNuevo: number): void => {

        const nuevoValor = valorNuevo + valor;
        setValor(nuevoValor);
        agregarHistorial(nuevoValor);
    }

    const reset = (): void => {
        setValor(0);
        setValoresHistorial([{ id: 1, valor: 0, fecha: new Date() }]);
    }


    return (
        <>
            <div style={{ border: '5px solid green' }}>

                <h2>Contador con historia</h2>
                <h3>Contador: {valor}</h3>

                <button onClick={() => { cambiarValor(-1) }}>-</button>
                <button onClick={() => { reset() }}>0</button>
                <button onClick={() => { cambiarValor(1) }}>+</button>

                <h3>Histórico del contador</h3>
                <ul>
                    {valoresHistorial.map(v => (
                        <li key={v.id}>
                            {v.id} --- {v.valor} --- {v.fecha.toLocaleString()}
                        </li>

                    ))}

                </ul>

                <h4>Cantidad de elementos del histórico: {valoresHistorial.length}</h4>

            </div>
        </>
    );
}

export default Contador3;