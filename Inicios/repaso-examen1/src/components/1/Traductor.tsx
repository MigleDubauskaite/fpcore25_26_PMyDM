import { useState, type JSX } from "react";

type IdiomasDisponibles = 'ES' | 'EN' | 'FR';

type Traduccion = {

    [key in IdiomasDisponibles]: {
        titulo: string;
        seleccion: string;
        bienvenida: string;
        descripcion: string;
    }
}

function Traductor(): JSX.Element {

    const [idioma, setIidoma] = useState<IdiomasDisponibles>("ES");

    const Traducciones: Traduccion = {

        'ES': {
            titulo: 'ESPAÑOL',
            seleccion: 'ESPAÑOL',
            bienvenida: 'ESPAÑOL',
            descripcion: 'ESPAÑOL',
        },
         'EN': {
            titulo: 'ENGLISH',
            seleccion: 'ENGLISH',
            bienvenida: 'ENGLISH',
            descripcion: 'ENGLISH',
        },
         'FR': {
            titulo: 'FRANCAIS',
            seleccion: 'FRANCAIS',
            bienvenida: 'FRANCAIS',
            descripcion: 'FRANCAIS',
        }
    }

    const textos = Traducciones[idioma];

    return (
        <>
            <div style={{ border: '5px solid #654', padding: '40px', marginTop: '30px' }}>

                <h1>Título en {textos.titulo}</h1>
                <h2>Selecciona en {textos.seleccion}</h2>

                <button onClick={()=>setIidoma("ES")} className={idioma==='ES' ? 'activo':''} >ES</button>
                <button onClick={()=>setIidoma("EN")} className={idioma==='EN' ? 'activo':''}>EN</button>
                <button onClick={()=>setIidoma("FR")} className={idioma==='FR' ? 'activo':''}>FR</button>

                <h3>Bienvenida en {textos.bienvenida}</h3>
                <p>Descripcion en {textos.descripcion}</p>

            </div>
        </>
    )

}

export default Traductor;