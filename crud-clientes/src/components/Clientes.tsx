import { useState, type JSX } from "react";
import { apiClientes } from "../service/api";

interface Cliente {
    id:number;
    nombre:string;
    email:string;
    telefono:string;
    direccion:string;
    activo:boolean;
}

function Clientes(): JSX.Element{

    const [loading, setLoading] = useState<boolean>(false);

    const [clientes, setClientes] = useState<Cliente[]>([]);


    // GET
    const obtenerUsuarios = async () => {

        setLoading(true);

        try {
            const response = await apiClientes.get<Cliente[]>('/clientes');
            setClientes(response.data);            
        } catch (error) {
            alert('Error al obtener usuarios');
        } finally{
            setLoading(false);
        }

    }



    return(
        <>

        <h2>dewf</h2>

        <button onClick={obtenerUsuarios}>Listar clientes</button>
        
        </>
    )
}

export default Clientes;