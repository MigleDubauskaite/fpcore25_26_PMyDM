import { useState, type JSX } from "react";
import './_2SelectorIdioma.css'

// Esto es un union type en TypeScript.
// Significa que una variable de tipo IdiomasDiponibles solo puede tener uno de estos valores exactos: 
// 'ES', 'EN', 'FR', 'DE' o 'LT'.
type IdiomasDisponibles = 'ES' | 'EN' | 'FR' | 'DE' | 'LT';

// Esto es un mapped type en TypeScript.
// Significa: "para cada valor de IdiomasDiponibles, crea una propiedad en este objeto".
// Las propiedades internas (titulo, texto, saludo, mensaje) definen qué datos tiene cada idioma.
type Traduciones = {

    // [key in IdiomasDiponibles] significa que vamos a crear un objeto donde cada clave es uno de esos idiomas.
    [key in IdiomasDisponibles]: {
        titulo: string;
        texto: string;
        saludo: string;
        mensaje: string;
    }
}

function SelectorIdioma() : JSX.Element {

    // textosTraducidos solo tiene las claves definidas en IdiomasDiponibles.
    // Pero idioma: string podría ser cualquier string, así que TS no puede inferir el tipo exacto.
    // TS puede validar que solo se van a utilziar los lenguajes predeterminados
    const [idioma, setIdioma] = useState<IdiomasDisponibles>("ES");

    // creamos un objeto con claves (ES, EN, FR...)
    // Definir todas las traducciones dentro de un objeto tipado garantiza que cada idioma tenga todas las propiedades (titulo, texto, saludo, mensaje).
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

    // obtienemos el objeto de traducción según el idioma seleccionado.
    const textos = textosTraducidos[idioma];

    // tambien se puede tiparlo aqui y no dentro de setIdioma
    // const opcionesBotones: { idioma: string; code: IdiomasDiponibles }[]
    const opcionesBotones = [
                    { idioma: "Español", code: "ES" },
                    { idioma: "English", code: "EN" },
                    { idioma: "Français", code: "FR" },
                    { idioma: "Deutsch", code: "DE" },
                    { idioma: "Lietuvių", code: "LT" }
                    ];
    
    return (
        <>
            <div style={{ marginTop: 50, border: '3px solid #87BAC3' }}>
                <h1 style={{ color: '#53629E' }}>{textos.titulo}</h1>
                <h3>{textos.texto}</h3>
                <p>{textos.mensaje}</p>

                <div style={{ marginBottom: 20 }}>

                      {opcionesBotones.map((opcion) => (
                     <button key={opcion.code} 
                        // opcion.code es un string por defecto.
                        // Para que TypeScript reconozca que es un IdiomasDiponibles, puedes hacer un cast:
                        onClick={() => setIdioma(opcion.code as IdiomasDisponibles)}> 
                        {opcion.idioma} </button>
                    ))}

                    {/* <button onClick={() => { setIdioma('ES') }}>Español</button>

                    <button onClick={() => { setIdioma('EN') }}>English</button>

                    <button onClick={() => { setIdioma('FR') }}>Français</button>

                    <button onClick={() => { setIdioma('DE') }}>Deutsch</button>

                    <button onClick={() => { setIdioma('LT') }}>Lietuvių</button>
                    */}
                  

                </div>
            </div>
        </>
    );
}

export default SelectorIdioma;