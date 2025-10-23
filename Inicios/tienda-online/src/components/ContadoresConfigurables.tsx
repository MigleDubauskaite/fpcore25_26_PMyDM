import { useState } from "react";

type ContadoresConfigurables = {
    titulo: String;
    inicial: number;
    paso: number;
}

function ContadoresConfigurables({titulo, inicial, paso}: ContadoresConfigurables){
const [numero, setNumero] = useState(inicial);

  return (
    <div>
        <h2>{titulo}: <span>{inicial}</span> </h2>
        <button onClick={()=>{setNumero(numero + inicial)}}>+{paso}</button>
    </div>
  )
}

export default ContadoresConfigurables;