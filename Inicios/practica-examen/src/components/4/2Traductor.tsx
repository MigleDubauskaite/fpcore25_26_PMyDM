import { useState, type JSX } from "react";

type IdiomasDisponibles = 'ES' | 'EN' | 'FR';

type Idioma = {
    [key in IdiomasDisponibles]: {
        titulo: string,
        seleccion: string,
        bienvenida: string,
        descripcion: string
    }
}

function Traductor4(): JSX.Element {

    const [idioma, setIdioma] = useState<IdiomasDisponibles>('ES');

    const traducciones: Idioma = {

        'ES': {
            titulo: "ESPAÑOL",
            seleccion: "ESPAÑOL",
            bienvenida: "ESPAÑOL",
            descripcion: "ESPAÑOL"
        },

        'EN': {
            titulo: "ENGLISH",
            seleccion: "ENGLISH",
            bienvenida: "ENGLISH",
            descripcion: "ENGLISH"
        },

        'FR': {
            titulo: "FRANCAIS",
            seleccion: "FRANCAIS",
            bienvenida: "FRANCAIS",
            descripcion: "FRANCAIS"
        }

    }

    const texto = traducciones[idioma];

    return (
        <>
            <div style={{ border: '5px solid rgba(5, 250, 128, 1)' }}>

                <h1>Título en {texto.titulo}</h1>
                <h2>Selecciona en {texto.seleccion}</h2>

                <button onClick={() => setIdioma('ES')}>Español</button>
                <button onClick={() => setIdioma('EN')}>English</button>
                <button onClick={() => setIdioma('FR')}>Francais</button>

                <h3>Bienvenida en {texto.bienvenida}</h3>
                <p>Descripcion en {texto.descripcion}</p>

            </div>
        </>
    );

}

export default Traductor4;