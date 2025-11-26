import { useState, type JSX } from "react";
import './Contador.css'

type Valor = {
    id: number;
    valor: number;
    fecha: Date;
}

function Contador(): JSX.Element {

    const [valores, setValores] = useState<Valor[]>([{ id: 1, valor: 0, fecha: new Date() }]);
    const [valor, setValor] = useState<number>(0);

    const agregarHistorial = (valorIntroducido: number): void => {

        const maxID = valores.reduce((max, v) => v.id > max ? v.id : max, 0);
        const nuevoValor = { id: maxID + 1, valor: valorIntroducido, fecha: new Date() };

        setValores([...valores, nuevoValor]);
    }

    const cambiarValor = (valorNuevo: number): void => {
        const nuevoValor = valor + valorNuevo;
        setValor(nuevoValor);
        agregarHistorial(nuevoValor);
    }

    const reset = (): void => {
        setValor(0);
        setValores([{ id: 1, valor: 0, fecha: new Date() }]);
    }

    return (
        <>
            <div style={{ border: '5px solid #654', padding: '40px' }}>

                <h1>Contador con historia</h1>

                <h3>Contador: {valor}</h3>
                <button onClick={() => cambiarValor(-1)}>➖</button>
                <button onClick={() => reset()}>⭕</button>
                <button onClick={() => cambiarValor(1)}>➕</button>

                <h3>Histórico del contador</h3>

                {valores.map(v => (
                    <div key={v.id} style={{ border: '2px solid #543', borderRadius: '50px' }}>
                        <ul>
                            <li>{v.id} - {v.valor}: {v.fecha.toLocaleString()}</li>
                        </ul>
                    </div>
                ))}

                <p>Cantidad de elementos del histórico: {valores.length}</p>


            </div>
        </>
    )
}

export default Contador;