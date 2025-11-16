import { useState } from "react";

function _3CalculadoraPropina(){

    // importe
    const [importe, setImporte] = useState<string>('0.0');

    // porcentaje
    const [propina, setPropina] = useState <number> (0);

    // importe propina
    const importeDePropina:number = Number(importe) * propina/100;

    // total
    const totalPagar = Number(importe) + importeDePropina;

    return(
        <>
        <div style={{border: '4px solid #D34E4E', marginTop: '50px'}}>
            <h1>Calculadora de Propinas</h1>

            <div style={{border: '4px solid #F9E7B2', margin: '50px'}}>
                <h2>Importe de la cuenta:</h2>
                
                <input type="number" placeholder="0.00" onChange={(e) => {setImporte(e.target.value)}}></input>

            </div>

            <div style={{border: '4px solid #DDC57A', margin: '50px'}}>
                <h2>Porcentaje de propina: </h2>
                <div>
                    <button style={{backgroundColor: '#AAC4F5'}} onClick={()=> {setPropina(10)}}>10%</button>
                    <button style={{backgroundColor: '#AAC4F5'}} onClick={()=> {setPropina(15)}}>15%</button>
                    <button style={{backgroundColor: '#AAC4F5'}} onClick={()=> {setPropina(20)}}>20%</button>
                </div>
            </div>

            <div style={{border: '4px solid #CE7E5A', margin: '50px', backgroundColor: '#FFF2C6'}}>
                <h2>Desglose</h2>
                <p>Cuenta: {importe}€</p>
                <p>Propina ({propina}%): {importeDePropina}€</p>
                <p>Total a pagar: {totalPagar}€</p>
            </div>

        </div>
        </>
    );

}

export default _3CalculadoraPropina;