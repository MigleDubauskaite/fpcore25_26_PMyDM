import { useState, type JSX } from "react";

function Calculadora() : JSX.Element {

    const [importe, setImporte] = useState<string>("");
    const [propina, setPropina] = useState<number>(0);

    const valorPropina:number = Number(importe) * propina/100;
    const totalPagar:number = Number(importe) + valorPropina;

    return(
        <>
        <div style={{border:'5px solid #654', marginTop: '30px'}}>
            <h1>Calculadora de propinas</h1>
            
            <h2>Importe de la cuenta</h2>
            <input 
                type="number"
                placeholder="0.00"
                onChange={(e)=>{setImporte(e.target.value)}} />
            
            <br />

            <h2>Porcentaje de la propina</h2>
            <button onClick={()=>setPropina(10)} className={propina===10 ? 'activo':''}>10%</button>
            <button onClick={()=>setPropina(15)} className={propina===15 ? 'activo':''}>15%</button>
            <button onClick={()=>setPropina(20)} className={propina===20 ? 'activo':''}>20%</button>

            <h2>Desglose</h2>
            <p>Propina ({propina}%): {valorPropina.toFixed(2)}€</p>
            <p>Propina: {totalPagar.toFixed(2)}€</p>

        </div>
        </>
    )
}

export default Calculadora;