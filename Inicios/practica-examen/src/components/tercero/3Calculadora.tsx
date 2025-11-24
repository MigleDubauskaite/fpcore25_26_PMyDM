import { useState, type JSX } from "react";

function Calculadora3() : JSX.Element{

    const [importe, setImporte] = useState<string>("");
    const [propina, setPropina] = useState<number>(0);

    const valorPropina = Number(importe) * propina/100
    const totalPagar = Number(importe) + valorPropina;

    return(
        <>
        <div style={{border:'5px solid rgba(161, 90, 194, 1)'}}>

            <h2>Calculadora de propinas</h2>

            <h3>Importe de la cuenta</h3>
            <input 
                type="number"
                placeholder="0.00"
                onChange={(e)=>{setImporte(e.target.value)}} />

            <h3>Porcentaje de la propina</h3>
            <button onClick={()=>{setPropina(10)}}>10%</button>
            <button onClick={()=>{setPropina(15)}}>15%</button>
            <button onClick={()=>{setPropina(20)}}>20%</button>

            <h3>Desglose</h3>
            <p>Propina ({valorPropina.toFixed(0)}%): {valorPropina.toFixed(2)}€ </p>
            <p>Total a pagar: {totalPagar.toFixed(2)}€ </p>

        </div>
        </>
    );

}

export default Calculadora3;