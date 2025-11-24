import { useState, type JSX } from "react";

type Genero = 'rock' | 'pop' | 'jazz' | 'clasica';

type Musica = {
    [key in Genero]: {
        titulo: string,
        artista: string,
        descripcion: string
    }
}

function SelectorGeneroMusica(): JSX.Element {

    const [genero, setGenero] = useState<Genero>('clasica');

    const propiedades: Musica = {

        'clasica': {
            titulo: 'Concierto para piano No. 21',
            artista: 'Wolfgang Amadeus Mozart',
            descripcion: 'Una obra emblemática del periodo clásico, conocida por su elegancia y equilibrio melódico.'
        },
        'pop': {
            titulo: 'Blinding Lights',
            artista: 'The Weeknd',
            descripcion: 'Un éxito mundial de sonido retro-sintético que mezcla pop moderno con influencias de los años 80.'
        },
        'jazz': {
            titulo: 'So What',
            artista: 'Miles Davis',
            descripcion: 'Tema icónico del álbum “Kind of Blue”, caracterizado por su enfoque modal y atmósfera relajada.'
        },
        'rock': {
            titulo: 'Bohemian Rhapsody',
            artista: 'Queen',
            descripcion: 'Una pieza única que combina balada, ópera y rock, famosa por su estructura poco convencional.'
        }
    }

    const valores = propiedades[genero];

    return (
        <>
            <div style={{ border: '5px solid rgba(183, 160, 226, 1)' }}>

                <h1>Selector Genero Musica</h1>

                <h2>Título: {valores.titulo}</h2>
                <h3>Artista recomendado: {valores.artista}</h3>
                <h4>Descripción: {valores.descripcion}</h4>

                <button onClick={()=>setGenero("rock")} className={genero === "rock" ? "activo" : ""}>ROCK</button>
                <button onClick={()=>setGenero("pop")} className={genero === 'pop' ? 'activo' : ''}>POP</button>
                <button onClick={()=>setGenero("jazz")} className={genero === 'jazz' ? 'activo' : ''}>JAZZ</button>
                <button onClick={()=>setGenero("clasica")} className={genero === 'clasica' ? 'activo' : ''}>CLASICA</button>

            </div>
        </>
    )
}

export default SelectorGeneroMusica;