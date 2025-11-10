import { useState } from "react";

function Evento() {

    // 1
    const [nombre, setNombre] = useState<string>("");

    // 2
    const [color, setColor] = useState<string>("red");
    const seleccionarColor = (c:string) => {setColor(c)};
    
    return (
        <>
            <h1>Eventos</h1>
            <hr />

            {/* 1 */}
            <div>
            <h2>Probando on-change</h2>
            <p>Nombre: {nombre}</p>
            <input type="text" placeholder="Introduce el nombre..." 
                onChange={(e)=>{setNombre(e.target.value)}} />
            </div>

            <h1>Eventos con parametros</h1>
            <hr />

            {/* 2 */}
            <div>
                <h2>Colores</h2>
                <p style={{color: color}}>Color {color}</p>
                <button onClick={()=>seleccionarColor('red')}>Rojo</button>
                <button onClick={()=>seleccionarColor('green')}>Verde</button>
                <button onClick={()=>seleccionarColor('blue')}>Azul</button>
            </div>

        </>
    );

}

export default Evento;