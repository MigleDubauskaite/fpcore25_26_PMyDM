// FRAGMENTO <Fragment> </Fragment> o simplemente <>  </>

import { useState } from "react";

//import { Fragment } from "react/jsx-runtime";

function MiComponente() {

    /* es un estado que puede ser cambiado */
    const [visible, setVisible] = useState<boolean>(true);
    const [afirmativo, setAfirmativo] = useState<boolean>(true);

    // estados: modo 1
    const [estado, setEstado] = useState<string>('despierto');

    const cambiarEstado = () => {
        if (estado == 'despierto') { setEstado('descansando') }
        else if (estado == 'descansando') { setEstado('durmiendo') }
        else { setEstado('despierto') }
    };

    /* estados: modo 2 */
    const listaEstados: string[] = ['estadoA', 'estadoB', 'estadoJ', 'estadoM'];
    const [idxEstado, setIdxEstado] = useState(0);

    // onChange
    const [textoIntroducido, setTextoIntroducido] = useState<string>("");

    return (
        <>
            <h1>Fragment  </h1>
            <h2>Componente siempre visible</h2>
            <p>Esto es un párafo siempre visible </p>
            <small>Fin del componente visible</small>
            <br /><br />

            <h2>Componente mostrar/ocultar algo</h2>

            {/* si pulsamos en el botón, nos demuestra el párrafo */}
            {visible && <p style={{ color: 'blue' }}>Esto es un párafo ocultable</p>}

            <button onClick={() => { setVisible(!visible) }}>{!visible ? "Mostrar" : "Ocultar"}</button>
            <br />
            <small>Fin del mostrar/ocultar</small>

            <br /><br />

            <h2>Mostrar una u otra cosa</h2>

            {afirmativo ? <><h3>AFIRMANDO</h3> <p>Acabo de afirmar algo</p></> : <><h3>NEGANDO</h3><p>Acabo de negar algo</p></>}

            <button onClick={() => { setAfirmativo(!afirmativo) }}>{afirmativo ? "Negar" : "Afirmar"}</button>
            <br />
            <small>Fin del afirmando/negando</small>

            <br /><br />
            <h2>Cambio entre estados (modo 1: un elemento)</h2>
            <p>Estado: <span>{estado}</span></p>
            <button onClick={cambiarEstado}>Cambiar estado</button>

            <br />
            <small>Fin del cambio de estados (modo 1)</small>

            <br /><br />

            <h2>Cambio entre estados (modo 2: más elementos)</h2>

            <p>Estado: {listaEstados[idxEstado]}</p>
            <button onClick={() => { setIdxEstado(idxEstado === listaEstados.length - 1 ? 0 : idxEstado + 1); }}>Cambiando los estados</button>

            <br /><br />
            <small>Fin del cambio de estados (modo 1)</small>

            <br /><br /><br />
            <h2>EVENTOS</h2>
            <hr />

            <h3>Evento onChange</h3>

            <input type="text" placeholder="Introduce un texto"
                onChange={(e) => {
                    // cada vez que se introduce una letra se va a decir el valor de input
                    // target is a property of an event object that refers to the element that triggered the event

                    // input contiene target y target contiene value: 
                    // cuando se cambia el valor de value el valor de texto introducido se cambia
                    setTextoIntroducido(e.target.value);

                    //e.target hace referencia al elemento que provocó el evento, en este caso, el input.
                    //e.target.value es el texto que el usuario ha escrito dentro del input.

                }} />
            <p>Estás escribiendo: {textoIntroducido}</p>

            <br />
            <small>Fin del evento onChange</small>

        </>
    )
}

export default MiComponente;