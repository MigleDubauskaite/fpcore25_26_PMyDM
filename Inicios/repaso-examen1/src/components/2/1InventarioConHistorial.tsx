import { useState, type JSX } from "react";

type TipoAccion = 'incrementar' | 'reset' | 'decrementar';

type Contador = {
    id: number;
    valor: number;
    fecha: Date;
    accion: TipoAccion;
}

function Inventario(): JSX.Element {

    const [valor, setValor] = useState<number>(0);

    const [valores, setValores] = useState<Contador[]>([
        { id: 1, valor: 0, fecha: new Date(), accion: "reset" }
    ]);

    const agregarHistorial = (valor: number, accion: TipoAccion): void => {

        const maxID = valores.reduce((max, v) => v.id > max ? v.id : max, 0);
        const nuevoValor = { id: maxID + 1, valor: valor, fecha: new Date(), accion };

        setValores([...valores, nuevoValor]);
    }

    const cambiarValor = (valorNuevo: number): void => {
        const nuevoValor = valor + valorNuevo;
        setValor(nuevoValor);
        agregarHistorial(nuevoValor, valorNuevo === 1 ? 'incrementar' : 'decrementar');
    }

    const reset = (): void => {
        setValor(0);
        agregarHistorial(0, 'reset');
    }


    return (
        <>
            <div style={{ border: '5px solid rgba(14, 119, 168, 1)' }}>

                <h1>✔️ Ejercicio 1 – Contador con registro de acciones</h1>

                <h2>Valor actual {valor}</h2>

                <button onClick={() => cambiarValor(-1)}>Descrementar</button>
                <button onClick={() => reset()}>Reset</button>
                <button onClick={() => cambiarValor(1)}>Incrementar</button>

                {valores.map(v => (
                    <div key={v.id} style={{ padding: '5px', border: '2px solid rgba(74, 97, 230, 1)' }}>
                        <ul>
                            <li>{v.id}: VALOR <strong style={{ fontSize: '2rem' }}> {v.valor} </strong> ---- {v.fecha.toLocaleString()} [{v.accion}]</li>
                        </ul>
                    </div>
                ))}

            </div>
        </>
    )

}

export default Inventario;