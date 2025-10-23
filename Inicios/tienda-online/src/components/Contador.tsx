import { useState } from "react";

function Contador(){

    const [numero, setNumero] = useState(0);

    return (
        <div className="contador">

            <h4>Contador: {numero}</h4>
            <button onClick={()=> {setNumero(numero + 1)}}>+1</button>
            <button onClick={()=> {setNumero(numero - 1)}}>-1</button>
            <button onClick={()=> {setNumero(0)}}>Reset</button>
            <br /><br /><br />

        </div>
    )
}

export default Contador;