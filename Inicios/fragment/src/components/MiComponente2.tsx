import { useState } from "react";

function MiComponente2() {

    // 1: mostrar / ocultar
    const [visible, setVisible] = useState<boolean>(true);

    // 2: cambiando estado (claro / oscuro)
    const [claro, setClaro] = useState<boolean>(true);

    // 3: cambiando varios estados (desayuno / comida / almuerzo / cena)
    const [estado, setEstado] = useState<string>("desayunando");

    // 4:
    const estado2:string[] = ["durmiendo", 'desayunando', 'trabajando', 'descansando', 'leyendo']
    const [numEstado, setNumEstado] = useState<number>(0);

    return (
        <>
            <h2>Repasando Fragment</h2>
            {/* 0 */}
            <h3>0: Mostrar siempre</h3>
            <p>Texto siempre mostrado</p>

            {/* 1 */}
            <h3>1: Ocultar al pulsar un boton</h3>
            {
                visible && 
                <>
                <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZyY28wcWNmMmE0NTltdmNvYjc1eXk2Z2RpdDU3M205eGx0cXQ4MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0G192DqS37tOmAP6/giphy.gif"></img>
                <p>Mostrando un GIF 😍</p>
                </>
            }

            <button onClick={()=>{setVisible(!visible)}}>{visible ? "Ocultar gif" : "Mostrar gif"}</button>

            {/* 2 */}
            <h3>2: Alternar valores</h3>
            {
                claro ? 
                <>
                <p style={{color: "yellow"}}>El color es: {claro ? "claro" : "oscuro"}</p>
                    <ul><li>Feliz</li><li>Animado</li></ul>
                </> : 
                <><p style={{color: "blue"}}>El color es: {claro ? "claro" : "oscuro"}</p>
                    <ul><li>Triste</li><li>Deprimido</li></ul>
                </>
            }

            <button onClick={()=>{setClaro(!claro)}}>Intercambiar tono del color</button>

            {/* 3 */}
            <h3>3: Transición de estados SIMPLE</h3>

            <p>Estoy {estado}</p>

            <button onClick={()=>{
                setEstado(estado === 'desayunando' ? 'comiendo' :  estado === 'comiendo' ? 'cenando' : 'desayunando')
            }}>cambiando estados de comer</button>

            {/* 4 */}
            <h3>4: Transición de estados usando ARRAY</h3>
            <p>Estado actual: {estado2[numEstado]}</p>
            <button onClick={()=>{
                setNumEstado(numEstado === estado2.length - 1 ? 0 : (numEstado + 1));
            }}>Próximo estado</button>


        </>
    );

}

export default MiComponente2;