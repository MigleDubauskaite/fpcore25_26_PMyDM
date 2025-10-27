import { useState } from "react";
import "./Calificacion.css";

type EnergiaPersonaje = {
    nivelMax:number;
    nivelActual:number;
}

function dibujar(nivelActual:number, nivelMax:number){

    let emojis:string = " ";
    for(let i = 0; i < nivelMax; i++){
        emojis += i < nivelActual ? "🔥" : "⚪";
    }
    return emojis;
}

function estado(nivelActual:number, nivelMax:number){

    let resultado = nivelActual / nivelMax * 100;
    if(resultado <= 20) return "Cansado";
    if(resultado <= 40) return "Medio activo";
    if(resultado <= 80) return "Muy activo";
    return "Exuberante";
 
}

function EnergiaPersonaje({nivelMax, nivelActual}:EnergiaPersonaje){

    let [valor, setValor] = useState<number>(nivelActual);
    

    return(
        <div>
            <h2>{dibujar(valor, nivelMax)}</h2>
            <h4>Estado: {estado(valor, nivelMax)} </h4>
            <button onClick={()=>{setValor( (valor < 0 ? 1 : valor + 1) )}}>+1</button>
            <button onClick={()=>{setValor( (valor > nivelMax ? nivelMax - 1 : valor - 1 )  )}}>-1</button>
            <button onClick={()=>{setValor(valor=0)}}>Resetear</button>
            <br />
            <br />
            <hr />
        </div>
    );

}

export default EnergiaPersonaje;