import { useState } from "react";

type MeditorEmocion = {
    nivelActual:number;
    nivelMax:number;
}

function dibujarEmojis(nivel:number, nivelMax:number){

    const emojis = [];

    for(let i = 0; i < nivelMax; i++){

        let noMarcada = i > nivel;

        emojis.push(

            <span>
                {noMarcada ? "-" : "+" };
            </span>
           
                
            
        )

    }
    return emojis;

}

function MeditorEmocion({nivelActual, nivelMax}:MeditorEmocion){

    let[nivel, setNivel] = useState<number>(nivelActual);

    return(
        <div>
            <h4>Intensidad de la emoción: {nivel} / {nivelMax}</h4>
            <button onClick={()=>{setNivel( nivel >= nivelMax ? nivelMax : (nivel + 1))}}>+1</button>
            <button onClick={()=>{setNivel(nivel <= 0 ? 0 : nivel - 1)}}>-1</button>
            <button onClick={()=>{setNivel(nivel = 0)}}>Resetear</button>
        </div>
    );
}

export default MeditorEmocion;