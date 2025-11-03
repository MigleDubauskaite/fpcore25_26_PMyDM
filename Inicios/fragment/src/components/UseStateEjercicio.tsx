import { useState } from "react";

function UseStateEjercicio() {

    // 1 contador simple: 
    const [numero, setNumero] = useState<number>(0);

    // 2 interruptor de luz
    const [encendido, setEncendido] = useState<boolean>(true);

    // 3 texto dinamico
    const [texto, setTexto] = useState<string>("");

    // 4 mostrar/ocultar texto
    const [visible, setVisible] = useState<boolean>(true);

    // 5 cambio de color
    const [color, setColor] = useState<string>("red");

    function cambioColor() {

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        let colorAleatorio = `rgb(${r}, ${g}, ${b})`;

        setColor(colorAleatorio);
    }


    return (
        <>
            <div>
                <h2>1: Contador simple</h2>
                <p>Número actual: {numero}</p>
                <button onClick={() => { setNumero((numero < 0 ? 0 : numero) + 1) }}>+</button>
                <button onClick={() => { setNumero(0) }}>Restart</button>
                <button onClick={() => { setNumero((numero <= 0 ? 0 : numero - 1)) }}>-</button>
            </div>

            <div>
                <h2>2: Interruptor de luz</h2>
                {encendido ? <p>ENCENDIDO💡</p> : <p>APAGADO📴</p>}
                <button onClick={() => { setEncendido(!encendido) }}>{encendido ? "Apagar" : "Encender"}</button>
            </div>

            <div>
                <h2>3: Texto dinámico</h2>
                <form>
                    <input placeholder="Introduce tu nombre" onChange={(e) => { setTexto(e.target.value) }}></input>
                </form>
                <p>Tu nombre es: {texto}</p>
            </div>

            <div>
                <h2>4: Mostrar/Ocultar texto</h2>
                {visible &&
                    <>
                        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTdtdWU0dG9odDlrZ3g5ank5enpsbnY2YmhxcDVvaGFldThlcmh4NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ndAvMC5LFPNMCzq7m/giphy.gif" alt="video" style={{ width: '120px' }} />
                        <p>Perrito bonito</p>
                    </>}
                <button onClick={() => { setVisible(!visible) }}>{visible ? "Ocultar" : "Mostrar"}</button>
            </div>

            <div>
                <h2>5: Cambio de color</h2>
                {<div style={{ backgroundColor: color, width: '150px', height: '100px', fontWeight: 'bold' }}>
                    <p style={{ fontSize: '1.4rem' }} >Hola</p>
                    <p>Mundo</p>
                </div>}
                <button onClick={() => { cambioColor() }}>Cambiar color</button>
            </div>
        </>
    );


}

export default UseStateEjercicio;