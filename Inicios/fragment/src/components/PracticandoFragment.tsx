import { useState } from "react";


function PracticandoFragment() {

    // 🧩 Enunciado 1: Control de visibilidad múltiple
    const [verNoticias, setVerNoticias] = useState<boolean>(true);
    const [verEventos, setVerEventos] = useState<boolean>(true);

    // ⚙️ Enunciado 2: Alternar mensajes afirmativos y negativos
    const [cambiarTexto, setCambiarTexto] = useState<boolean>(true);

    // 🔁 Enunciado 3: Ciclo de estados
    const [estado, setEstados] = useState<string>("inicial");

    function cambiarEstado() {
        if (estado === "inicial") setEstados("procesando");
        else if (estado === "procesando") setEstados("completado");
        else setEstados("inicial")
    }

    const [indiceEstado, setIndice] = useState<number>(0);
    const estados = ["durmiendo", "descansando", "activo"];

    function cambiandoEstado() {
        if (indiceEstado === estados.length - 1) setIndice(0);
        else setIndice(indiceEstado + 1);
    }

    // 🔄 Enunciado 5: Lista de estados y navegación
    const [idxColor, setIdxColor] = useState<number>(0);
    const colores = ["red", "green", "blue", "yellow"];

    function cambiarColor(cambio: string) {
        if (cambio === "siguiente") {
            setIdxColor((idxColor + 1) % colores.length);
        }
        else {
            setIdxColor((idxColor + colores.length - 1) % colores.length);
        }
    }

    return (<>

        <div>
            <h3>🧩 Enunciado 1: Control de visibilidad múltiple</h3>
            {verNoticias &&
                <>
                    <h3>Noticias</h3>
                    <hr />
                    <p>Hoy ha salido el sol 🌞</p>
                </>
            }
            <button onClick={() => { setVerNoticias(!verNoticias) }} >{!verNoticias ? "Mostrar Noticias" : "Ocultar Noticias"}</button>

            {verEventos &&
                <>
                    <h3>Eventos</h3>
                    <hr />
                    <p>Baile Flamenco🪭💃🏼</p>
                </>
            }
            <button onClick={() => { setVerEventos(!verEventos) }}>{verEventos ? "Ocultar Eventos" : "Mostrar Eventos"}</button>

        </div>

        <br />
        <div>
            <h3>⚙️ Enunciado 2: Alternar mensajes afirmativos y negativos</h3>

            {cambiarTexto ?
                <>
                    <p>Afirmativo 🧸🤗</p>
                </>
                :
                <>
                    <p>Negativo❌☠️</p>
                </>

            }

            <button onClick={() => { setCambiarTexto(!cambiarTexto) }}>{cambiarTexto ? "Cambiar texto a negativo" : "Cambiar texto a afirmativo"}</button>

        </div>

        <br />

        <>
            <h3>🔁 Enunciado 3: Ciclo de estados</h3>
            <p>Estado actual: {estado}</p>
            <button onClick={cambiarEstado}>Cambiar estado</button>
            <hr />

            <p>Estado actual: {estados[indiceEstado]}</p>
            <button onClick={cambiandoEstado}>Cambiar state</button>
        </>

        <br />
        <>
            <h3>🔄 Enunciado 5: Lista de estados y navegación</h3>

            <p style={{ color: colores[idxColor] }}>Color actual: {colores[idxColor]}</p>
            <button onClick={() => cambiarColor("anterior")}>Anterior</button>
            <button onClick={() => cambiarColor("siguiente")}>Siguiente</button>

        </>

    </>
    );


}

export default PracticandoFragment;