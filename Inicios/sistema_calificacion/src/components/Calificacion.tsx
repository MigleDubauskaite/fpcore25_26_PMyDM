import { useState } from "react";

type Calificacion = {
  titulo: String;
  maxEstrellas: number;
  calificacionInicial: number;
};

  function pintarEstrellas(valor:number, maximo:number) {
    let resultadoEstrellas :string = "";

    for(let i = 0; i < maximo; i++){
        resultadoEstrellas += i <= valor ? "⭐" : ";"
    }
    return resultadoEstrellas;
  }

function Calificacion({titulo, maxEstrellas, calificacionInicial,}: Calificacion) {
  let [value, setValue] = useState<number>(calificacionInicial);



  return (
    <div>
      <h1>{titulo}</h1>
      <h3> Rating: {value}/{maxEstrellas} estrellas {pintarEstrellas(calificacionInicial, maxEstrellas)}</h3>
      <button onClick={() => {setValue((value = 0)); }} >
        Resetear
      </button>
      <button onClick={() => {setValue((calificacionInicial + 1)); }} >
        +1
      </button>

    </div>
  );
}

export default Calificacion;
