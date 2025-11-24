import { useState, type JSX } from "react";

type ControladorTemperatura = {
    id: number,
    temperatura: number,
    fecha: Date
}

function ControladorTemperatura() : JSX.Element{

    const [temperatura, setTemperatura] = useState<number>(20);
    const [temperaturas, setTemperaturas] = useState<ControladorTemperatura[]>([{id: 1, temperatura: 20, fecha: new Date()}]);

    const agregarHistorial = (nuevoRegistro: number) : void => {

        const maxId = temperaturas.reduce((max, t) => t.id > max ? t.id : max, 0);
        const nuevo : ControladorTemperatura = {id: maxId+1, temperatura:nuevoRegistro, fecha: new Date()};
        setTemperaturas([...temperaturas, nuevo]);
    }

    const cambiarTemperatura = (valorTemperatura: number) : void => {

        const nueva = temperatura + valorTemperatura;
        setTemperatura(nueva);
        agregarHistorial(nueva);
    }

    const reset = () : void => {
        setTemperatura(20);
        setTemperaturas([{id:1, temperatura:20, fecha:new Date()}]);
    }

    return(
        <>
        <div style={{border:'5px solid rgba(255, 0, 0, 1)'}}>

            <h1>Controlador de Temperatura con Registro</h1>

            <h2>Temperatura actual: {temperatura} ºC</h2>

            <button onClick={()=>cambiarTemperatura(-1)}>➖</button>
            <button onClick={()=>reset()}>⭕</button>
            <button onClick={()=>cambiarTemperatura(1)}>➕</button>

            {temperaturas.map(t => (
                <ul key={t.id}>
                    <li>Cambio ID-{t.id} → {t.temperatura}ºC ({t.fecha.toLocaleString()})</li>
                </ul>
            ))}

            <p>Total hay {temperaturas.length} {temperaturas.length === 1 ? "registro" : "registros"}</p>

        </div>
        </>
    );

}

export default ControladorTemperatura;