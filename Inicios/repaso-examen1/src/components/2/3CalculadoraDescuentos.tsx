import { useState, type JSX } from "react";

function CalculadoraDescuentos(): JSX.Element {

    const [importe, setImporte] = useState<string>("");
    const [descuento, setDescuento] = useState<number>(0);

    const valorDescuento: number = Number(importe) * descuento / 100;
    const total = Number(importe) - valorDescuento;

    return (
        <>
            <div style={{ border: '5px solid rgba(14, 119, 168, 1)', marginTop: '30px' }}>

                <h1>✔️ Ejercicio 3 – Calculadora de descuentos con historial</h1>

                <span><strong>Importe: </strong></span>

                <input
                    type="number" placeholder="Importe"
                    onChange={(e) => setImporte(e.target.value)} />

                <br /><br />

                <button onClick={() => setDescuento(5)}>5%</button>
                <button onClick={() => setDescuento(10)}>10%</button>
                <button onClick={() => setDescuento(20)}>20%</button>

                <div style={{ border: '2px solid rgba(14, 119, 168, 1)', marginTop: '30px' }}>

                    <h3>Valor de descuento ({descuento}%): {valorDescuento.toFixed(2)} </h3>
                    <h3>Total precio: {total.toFixed(2)} </h3>

                </div>

            </div>
        </>
    )
}

export default CalculadoraDescuentos;