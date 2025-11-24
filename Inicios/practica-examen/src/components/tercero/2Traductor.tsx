import { useState, type JSX } from "react";

type IdiomasDisponibles = 'ES' | 'EN' | 'FR' | 'D';

type valoresTraducciones = {

    [key in IdiomasDisponibles]: {
        titulo: string,
        seleccion: string,
        bienvenida: string,
        descripcion: string
    }
}

function Traductor3(): JSX.Element {

    const [idioma, setIdioma] = useState<IdiomasDisponibles>('ES');

    const Traducciones: valoresTraducciones = {

        ES: {
            titulo: 'ESPAÑOL',
            seleccion: 'ESPAÑOL',
            bienvenida: 'ESPAÑOL',
            descripcion: 'ESPAÑOL'
        },
        EN: {
            titulo: 'ENGLISH',
            seleccion: 'ENGLISH',
            bienvenida: 'ENGLISH',
            descripcion: 'ENGLISH'
        },
        FR: {
            titulo: 'FRANCAIS',
            seleccion: 'FRANCAIS',
            bienvenida: 'FRANCAIS',
            descripcion: 'FRANCAIS'
        },
        D: {
            titulo: 'DEUTSCH',
            seleccion: 'DEUTSCH',
            bienvenida: 'DEUTSCH',
            descripcion: 'DEUTSCH'
        },

    }

    const textosTraducidos = Traducciones[idioma];

    return (
        <>
            <div style={{ border: '5px solid blue' }}>

                <h2>Título en {textosTraducidos.titulo}</h2>
                <h3>Selecciona en {textosTraducidos.seleccion}</h3>

                <button onClick={() => {setIdioma('ES')}}>Español</button>
                <button onClick={() => {setIdioma('EN')}}>English</button>
                <button onClick={() => {setIdioma('FR')}}>Francais</button>
                <button onClick={() => {setIdioma('D')}}>Deutsch</button>

                <h3>Bienvenida en {textosTraducidos.bienvenida}</h3>
                <p>Descripción en {textosTraducidos.descripcion}</p>

            </div>
        </>
    );

}

export default Traductor3;