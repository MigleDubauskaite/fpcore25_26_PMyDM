import type { JSX } from "react";
import { useState } from 'react';

type Asignatura = 'matematicas' | 'historia' | 'ingles' | 'ciencias';

type Valores = {
    [key in Asignatura]: {
        titulo: string;
        subtitulo: string;
        bienvenida: string;
        descripcion: string;
    }
}

const textos: Valores = {

    'matematicas': {
        titulo: 'Matemáticas Seleccionada',
        subtitulo: 'Área de ciencias exactas',
        bienvenida: 'Bienvenido a Matemáticas',
        descripcion: 'Aprende álgebra, geometría y cálculo'
    },

    'ingles': {
        titulo: 'Inglés Seleccionado',
        subtitulo: 'Área de idiomas',
        bienvenida: 'Bienvenido a inglés',
        descripcion: 'Mejora tu gramática, vocabulario y conversación'
    },

    'ciencias': {
        titulo: 'Ciencias Seleccionada',
        subtitulo: 'Área de ciencias naturales',
        bienvenida: 'Bienvenido a Ciencias',
        descripcion: 'Descubre biologia, fisica y quimica'
    },

    'historia': {
        titulo: 'Historia Seleccionada',
        subtitulo: 'Área de ciencias sociales',
        bienvenida: 'Bienvenido a Historia',
        descripcion: 'Explora eventos del pasado y civilizaciones antiguas'
    },

}

function SelectorAsignatura(): JSX.Element {

    const [asignatura, setAsignatura] = useState<Asignatura>('matematicas');

    const texto = textos[asignatura];

    return (
        <>
            <div style={{ border: '5px solid #543', padding: '30px' }}>

                <h1>SELECTOR DE ASIGNATURA</h1>

                <div className={asignatura} id="button-asignatura" >
                    <h1>{texto.titulo}</h1>
                    <h2>{texto.subtitulo}</h2>

                    <button className={asignatura === 'matematicas' ? 'active' : 'in'} onClick={() => setAsignatura("matematicas")}>Matematicas</button>
                    <button className={asignatura === 'historia' ? 'active' : 'in'} onClick={() => setAsignatura("historia")}>Historia</button>
                    <button className={asignatura === 'ingles' ? 'active' : 'in'} onClick={() => setAsignatura("ingles")}>Ingles</button>
                    <button className={asignatura === 'ciencias' ? 'active' : 'in'} onClick={() => setAsignatura("ciencias")}>Ciencias</button>

                    <h3>{texto.bienvenida}</h3>
                    <h4>{texto.descripcion}</h4>
                </div>

            </div>
        </>
    )

}

export default SelectorAsignatura;