import { useState, type JSX } from "react";

type Tema = 'claro' | 'oscuro' | 'azul' | 'verde';

type ValoresTema = {
    [key in Tema]: {
        titulo: string;
        descripcion: string;
    }
}

const temaAplicado: ValoresTema = {

    'claro': {
        titulo: "Tema claro",
        descripcion: '☀️🫡🌄🌞'
    },
    'oscuro': {
        titulo: "Tema oscuro",
        descripcion: '🌒🌚🌓🌑🌑'
    },
    'azul': {
        titulo: "Tema azul",
        descripcion: '💙🔷🟦🩵🔵'
    },
    'verde': {
        titulo: "Tema verde",
        descripcion: '🟩🟢💚🤢🍏📗'
    }
}

function SelectorTema(): JSX.Element {

    const [tema, setTema] = useState<Tema>("claro");

    const temaElegido = temaAplicado[tema];

    return (
        <>
            <div style={{ border: '5px solid rgba(14, 119, 168, 1)', marginTop: '30px' }}>

                <h1>✔️ Ejercicio 2 – Selector de tema con interfaz dinámica</h1>

                <div className={tema}>

                    <h2>{temaElegido.titulo}</h2>
                    <p>{temaElegido.descripcion}</p>
                </div>

                <button onClick={() => setTema('claro')}  >Claro</button>
                <button onClick={() => setTema('oscuro')}>Oscuro</button>
                <button onClick={() => setTema('azul')}>Azul</button>
                <button onClick={() => setTema('verde')}>Verde</button>

            </div>
        </>
    )

}

export default SelectorTema;