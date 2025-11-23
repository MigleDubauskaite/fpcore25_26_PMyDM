import { useState, type JSX } from "react";

type IdiomasDisponibles = 'ES' | 'EN' | 'FR';

type ElementosTraducciones= {

    [key in IdiomasDisponibles]: {

        titulo: string,
        subtitulo: string,
        bienvenida: string,
        descripcion: string
    }

}

function Traductor() : JSX.Element{

    const [idioma, setIdioma] = useState<IdiomasDisponibles>("ES");

    const traducciones : ElementosTraducciones = {

        ES:{
            titulo: "Título en ESPAÑOL",
            subtitulo: "Selecciona en ESPAÑOL",
            bienvenida: "Bienvenida en ESPAÑOL",
            descripcion: "Descripción en ESPAÑOL"
        },

        EN:{
            titulo: "Título en ENGLISH",
            subtitulo: "Selecciona en ENGLISH",
            bienvenida: "Bienvenida en ENGLISH",
            descripcion: "Descripción en ENGLISH"
        },

        FR:{
            titulo: "Título en FRANCAIS",
            subtitulo: "Selecciona en FRANCAIS",
            bienvenida: "Bienvenida en FRANCAIS",
            descripcion: "Descripción en FRANCAIS"
        }
    }

    const textoTraducido = traducciones[idioma];

    return(
        <>
        <div style={{border:'5px solid pink'}}>

            <h1>{textoTraducido.titulo}</h1>
            <h2>{textoTraducido.subtitulo}</h2>

            <button onClick={()=>{setIdioma('ES')}}>Español</button>
            <button onClick={()=>{setIdioma('EN')}}>English</button>
            <button onClick={()=>{setIdioma('FR')}}>Francais</button>

            <h3>{textoTraducido.bienvenida}</h3>
            <p>{textoTraducido.descripcion}</p>

        </div>
        </>
    );

}

export default Traductor;