type Salu2Props = {
    nombre: String;
    edad: number;

}

function Salu2({nombre, edad}: Salu2Props){
    return <div>{nombre} tiene {edad} años.</div>
}

export default Salu2;