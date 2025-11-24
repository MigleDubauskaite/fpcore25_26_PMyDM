import { useState, type JSX } from "react";

function CalculadoraSueldo(): JSX.Element {

    const [sueldo, setSueldo] = useState<string>("");
    const [bonificacion, setBonificacion] = useState(0);

    const valorBonificacion = Number(sueldo) * bonificacion / 100;
    const sueldoTotal = Number(sueldo) + valorBonificacion;

    return (
        <>
            <div style={{ border: '5px solid rgba(18, 206, 212, 1)' }}>

                <h1>Calculadora de Sueldo con Bonificación</h1>

                <span>Sueldo base:</span>
                <input
                    type="number"
                    placeholder="Introduce sueldo base"
                    value={sueldo}
                    onChange={(e) => setSueldo(e.target.value)} />

                <br />

                <button onClick={() => setBonificacion(5)} className={bonificacion===5 ? 'activo' : ''} >5%</button>
                <button onClick={() => setBonificacion(10)} className={bonificacion===10 ? 'activo' : ''} >10%</button>
                <button onClick={() => setBonificacion(20)} className={bonificacion===20 ? 'activo' : ''} >20%</button>

                <h3>Valor de bonificación: {valorBonificacion.toFixed(2)} €</h3>
                <h3>Sueldo total: {sueldoTotal.toFixed(2)} €</h3>

            </div>
        </>
    )
}

export default CalculadoraSueldo;