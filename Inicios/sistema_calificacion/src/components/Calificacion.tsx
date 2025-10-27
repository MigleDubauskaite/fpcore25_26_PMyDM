import { useState } from "react";
import "./Calificacion.css";

type Calificacion = {
  titulo: String;
  maxEstrellas: number;
  calificacionInicial: number;
};

// Javi
/* function marcarEstrellas(valor: number, maximo: number) {
  let resultadoEstrellas: string = "";
  let estrella = '⭐';
  let estrellaVacia = "✰";

  for (let i = 0; i < maximo; i++) {
    resultadoEstrellas += i < valor ? estrella : estrellaVacia;
  }
  return resultadoEstrellas;
} */

function dibujamosEstrellas(valorActual: number, maximo: number, setValue: (v: number) => void) {

  // setValue: (v: number) => void → esto es una función que recibe un número y no devuelve nada

  const estrellas = [];

  for (let i = 0; i < maximo; i++) {
    // valorActual = cuantas estrellas están marcadas
    // maximo = cuantas estrellas hay en total

    // si la i (posicion de la estrella) es menor que el valor actual, es marcada ⭐.
    const estaMarcada = i < valorActual;

    /*
    i=0  →  i<3? true   →  ⭐
    i=1  →  i<3? true   →  ⭐
    i=2  →  i<3? true   →  ⭐
    i=3  →  i<3? false   →  ✰
    i=4  →  i<3? false   →  ✰
    Resultado: ⭐ ⭐ ⭐ ✰ ✰ 
    */

    estrellas.push(
      <span
        key={i}
        // React necesita un key único para cada elemento en una lista.
        // Como cada estrella tiene un índice distinto i, usamos eso como key.

        onClick={() => setValue(i + 1)}
         // Cuando el usuario hace clic en la estrella, se llama a setValue con i + 1 para actualizar el valor actual.  
        >
       
        {estaMarcada ? '⭐' : "✰"}
      </span>
    );
  }
  return estrellas;
}

function obtenerPorcentaje(valorActual:number, valorMaximo:number){

  const porcentaje = (valorActual / valorMaximo) * 100;
  if(porcentaje <= 25) return "Malo";
  if(porcentaje <= 49) return "Regular";
  if(porcentaje <= 75) return "Bueno";
  if(porcentaje < 90) return "Muy bueno"
  if(porcentaje >= 90) return "Excelente";
}

function Calificacion({ titulo, maxEstrellas, calificacionInicial }: Calificacion) {
  let [value, setValue] = useState<number>(calificacionInicial);

  return (
    <div id="caja">
      <h1>{titulo}</h1>
      <h3> Rating: {value}/{maxEstrellas} estrellas </h3>
      <h4>{obtenerPorcentaje(value, maxEstrellas)}</h4>

      <div>{dibujamosEstrellas(value, maxEstrellas, setValue)}</div>

      <button onClick={() => { setValue((value = 0)); }} >Resetear </button>
      <button id="incremento" onClick={() => { setValue(((value >= maxEstrellas ? maxEstrellas : value +1))); }} > +1 </button>

    </div>
  );
}

export default Calificacion;
