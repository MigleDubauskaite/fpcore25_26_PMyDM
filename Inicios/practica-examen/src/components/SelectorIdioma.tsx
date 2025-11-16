import { useState } from "react";

type IdiomasDiponibles = 'ES' | 'EN' | 'FR' | 'DE' | 'LT';

type Traduciones = {

    // [key in IdiomasDiponibles] significa que vamos a crear un objeto donde cada clave es uno de esos idiomas.
    [key in IdiomasDiponibles]: {
        titulo: string;
        texto: string;
        saludo: string;
        mensaje: string;
    }
}


function SelectorIdioma() {

    // textosTraducidos solo tiene las claves definidas en IdiomasDiponibles.
    // Pero idioma: string podría ser cualquier string, así que TS no puede inferir el tipo exacto.
    // TS puede validar que solo se van a utilziar los lenguajes predeterminados
    const [idioma, setIdioma] = useState<IdiomasDiponibles>("ES");

    // creamos un objeto con claves (ES, EN, FR...)
    const textosTraducidos: Traduciones = {

        ES: {
            titulo: "Selector de idioma",
            texto: "Selecciona un idioma:",
            saludo: "¡Bienvenido!",
            mensaje: "Este es un ejemplo de cambio de idioma en React"
        },
        EN: {
            titulo: "Language Selector",
            texto: "Select a language:",
            saludo: "Welcome!",
            mensaje: "This is an example of language switching in React"
        },
        FR: {
            titulo: "Sélecteur de Langue",
            texto: "Sélectionnez une langue:",
            saludo: "Bienvenue!",
            mensaje: "Ceci est un exemple de changement de langue dans React"
        },
        DE: {
            titulo: "Sprachauswahl",
            texto: "Wählen Sie eine Sprache:",
            saludo: "Willkommen!",
            mensaje: "Dies ist ein Beispiel für einen Sprachwechsel in React"
        },
        LT: {
            titulo: "Kalbos pasirinkimas",
            texto: "Pasirinkite kalbą:",
            saludo: "Sveiki atvykę!",
            mensaje: "Tai yra React kalbos keitimo pavyzdys"
        }
    }

    const textos = textosTraducidos[idioma];

    return (
        <>
            <div style={{ marginTop: 50, border: '3px solid #87BAC3' }}>
                <h1 style={{ color: '#53629E' }}>{textos.titulo}</h1>
                <h3>{textos.texto}</h3>
                <p>{textos.mensaje}</p>

                <div style={{ marginBottom: 20 }}>

                    <button onClick={() => { setIdioma('ES') }}>Español</button>

                    <button onClick={() => { setIdioma('EN') }}>English</button>

                    <button onClick={() => { setIdioma('FR') }}>Français</button>

                    <button onClick={() => { setIdioma('DE') }}>Deutsch</button>

                    <button onClick={() => { setIdioma('LT') }}>Lietuvių</button>
                </div>
            </div>
        </>
    );
}

export default SelectorIdioma;