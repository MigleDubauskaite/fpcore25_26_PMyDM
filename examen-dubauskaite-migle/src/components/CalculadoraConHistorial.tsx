import { useState, type JSX } from "react";

type Valor = {
    id: number;
    valor: number;
    fecha: Date;
}

function Prueba(): JSX.Element {

    const [valores, setValores] = useState<Valor[]>([
        { id: 1, valor: 5, fecha: new Date() }
    ]);

    const [valor, setValor] = useState<number>(5);

    const agregarValor = (valorNuevo: number): void => {

        if (valor >= 1000) {
            alert(`No se puede incrementar más de ${valor}`);
            setValor(1000);
            return;
        }

        if (isNaN(valorNuevo) || valorNuevo > 1000) return;

        const maxId: number = valores.reduce((max, v) => v.id > max ? v.id : max, 0);

        const nuevoValor = { id: maxId + 1, valor: valorNuevo, fecha: new Date() };

        setValores([...valores, nuevoValor]);
    }

    const sumar = (): void => {

        const sumando = valor + 2;
        setValor(sumando);
        agregarValor(sumando);
    }

    const multiplicar = (): void => {

        const valorActualizado = valor * 2;
        const valorMaximoPermitido = 1000;

        let multiplicando = valor * 2 > 1000 ? 1000 : valor * 2;

        if (valorActualizado > valorMaximoPermitido) {
            setValor(valorMaximoPermitido);
            agregarValor(multiplicando);
            return;
        }

        setValor(multiplicando);
        agregarValor(multiplicando);
    }

    const reset = (): void => {
        setValor(5);
        const valorInicial = { id: 1, valor: 5, fecha: new Date() };
        setValores([valorInicial])
    }


    return (
        <>
            <div style={{ border: '5px solid #543', padding: '30px' }}>
                <h1>CALCULADORA CON HISTORIAL</h1>

                <h2>Resultado: {valor}</h2>

                <button onClick={() => sumar()}>+2</button>
                <br />

                <button onClick={() => multiplicar()}>x2</button>

                <h2>Historial de operaciones</h2>

                {valores.map(v => (
                    <ul key={v.id}>
                        <li> <strong> {v.id}</strong> - {v.valor} - {v.fecha.toLocaleString()}</li>
                        {/* {v.fecha.toISOString()} */}
                    </ul>
                ))}

                <br />
                <h3>Cantidad de operaciones realizadas: {valores.length}</h3>

                <button onClick={() => reset()}>Reiniciar</button>

            </div>
        </>
    );
}

export default Prueba;