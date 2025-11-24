import { useState, type JSX } from "react";

function CalculadoraVelocidad() : JSX.Element {

    const [distancia, setDistancia] = useState<string>("");
    const [tiempo, setTiempo] = useState<string>("");
    const [velocidad, setVelocidad] = useState<string>("");

    const distanciaNum = Number(distancia);
    const tiempoNum = Number(tiempo);

    return(
        <>
        <div style={{ border: '5px solid rgba(169, 245, 27, 1)' }}>

            <h1>Calculadora de Velocidad Media</h1>

            <span>Distancia: </span>
            <input 
                type="number" 
                placeholder="distancia en km"
                onChange={(e)=>{setDistancia(e.target.value)}} />

            <br />
            <span>Tiempo: </span>
            <input 
                type="number" 
                placeholder="tiempo en horas"
                onChange={(e)=>{setTiempo(e.target.value)}} />

            <br />

            <button onClick={()=> {
                setVelocidad(!distanciaNum && !tiempoNum ? "" : `${ (distanciaNum / tiempoNum).toFixed(2) } km/h` )
            }}>km/h</button>

            <button onClick={()=> {
                setVelocidad(distanciaNum < 0 && tiempoNum < 0 ? "" : `${ ( (distanciaNum*1000) / (tiempoNum*3600)).toFixed(2) } m/s` )
            }}>m/s</button>

            <h3>La velocidad media: {velocidad} </h3>

        </div>
        </>
    )
}

export default CalculadoraVelocidad;