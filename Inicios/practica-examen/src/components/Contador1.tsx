import { useState } from "react";

function Contador1(){

    // 1: contador:
    const [numero, setNumero] = useState<number>(0);

    return(
        <>
        <div style={{border: '3px solid #540863', padding: 20}}>

            <div style={{border: '3px solid #E49BA6', padding: 20, marginBottom: 20}}>
                <h1>Contador con historial</h1>
                <h3>Valor del contador: {numero} </h3>

                <button onClick={()=>{setNumero(numero <= 0 ? 0 : numero - 1)}}>➖</button>
                <button onClick={()=>{setNumero(0)}}>⭕</button>
                <button onClick={()=>{setNumero(numero + 1)}}>➕</button>
            </div>

            <div style={{border: '3px solid #E49BA6', padding: 20}}>
                <h3>Historial de valores: </h3>
            </div>
        </div>
        </>
    );
}

export default Contador1;