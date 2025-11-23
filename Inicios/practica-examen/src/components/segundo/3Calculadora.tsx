import { useState, type JSX } from "react";

function Calculadora() : JSX.Element {

    const [importe, setImporte] = useState<number>(0);
    const [propina, setPropina] = useState<number>(0);

    const valorPropina = importe * propina/100;
    const totalPagar = importe + valorPropina;

    return(
        <>
        <div style={{border: '5px solid orange'}}>

            <h1>Calculadora de propinas</h1>
            <h2>Importe de la cuenta</h2>
            <input type="number" placeholder="0" onChange={(e)=>{setImporte(Number (e.target.value))}}/>
            <br />

            <h2>Porcentaje de la propina</h2>
            <button onClick={()=>{setPropina(10)}}>10%</button>
            <button onClick={()=>{setPropina(15)}}>15%</button>
            <button onClick={()=>{setPropina(20)}}>20%</button>

            <h2>Desglose</h2>
            <p>Propina ({propina}%): {valorPropina.toFixed(2)} </p>
            <p>Total a pagar: {totalPagar.toFixed(2)}€ </p>

        </div>
        </>
    );
}

export default Calculadora;