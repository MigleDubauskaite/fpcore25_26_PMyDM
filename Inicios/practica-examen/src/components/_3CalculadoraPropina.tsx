import { useState, type JSX } from "react";
import './_3CalculadoraPropina.css'

function _3CalculadoraPropina() : JSX.Element {

    const [importe, setImporte] = useState<string>('0.0');
    const [propina, setPropina] = useState <number> (0);

    const importeDePropina = Number(importe) * propina/100;
    const totalPagar = Number(importe) + importeDePropina;

    return(
        <>
        <div style={{border: '4px solid #D34E4E', marginTop: '50px'}}>
            <h1>Calculadora de Propinas</h1>

            <div style={{border: '4px solid #F9E7B2', margin: '50px'}}>
                <h2>Importe de la cuenta:</h2>
                
                <input 
                    type="number" 
                    placeholder="0.00" 
                    onChange={(e) => setImporte(e.target.value)}></input>

            </div>

            <div style={{border: '4px solid #DDC57A', margin: '50px'}}>
                <h2>Porcentaje de propina: </h2>
                <div>
                    <button onClick={()=> {setPropina(10)}}>10%</button>
                    <button onClick={()=> {setPropina(15)}}>15%</button>
                    <button onClick={()=> {setPropina(20)}}>20%</button>
                </div>
            </div>

            <div style={{border: '4px solid #CE7E5A', margin: '50px', backgroundColor: '#FFF2C6'}}>
                <h2>Desglose</h2>
                <p>Cuenta: {Number(importe).toFixed(2)}€</p>
                <p>Propina ({propina}%): {importeDePropina.toFixed(2)}€</p>
                <p>Total a pagar: {totalPagar.toFixed(2)}€</p>
            </div>

        </div>
        </>
    );

}

export default _3CalculadoraPropina;