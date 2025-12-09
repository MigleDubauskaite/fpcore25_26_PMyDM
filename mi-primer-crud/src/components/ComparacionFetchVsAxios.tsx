import axios from "axios";
import { useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

function ComparacionFetchVsAxios() {

    const [userFetch, setUserFetch] = useState<User | null>(null);
    const [userAxios, setUserAxios] = useState<User | null>(null);

    // petición asincrona
    const obtenerConFetch = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

            // Fetch no lanza los errores 404 o 500
            if (!response.ok) throw new Error(`Http error: ${response.status}`);

            const data: User = await response.json();
            setUserFetch(data);

        } catch (error) {
            console.error(`Error con fetch: ${error}`);
        }
    };

    const obtenerConAxios = async () => {

        try {
            const response = await axios.get<User>('https://jsonplaceholder.typicode.com/users/2');
            setUserAxios(response.data)
        }
        catch (error) {
            console.error(`Error con axios: ${error}`);
        }

    }

    return (
        <>
            <div>
                <h3>FETCH</h3>
                <button onClick={obtenerConFetch}>Llamada fetch</button>
                <ul>
                    <li>ID: {userFetch?.id}</li>
                    <li>NAME: {userFetch?.name}</li>
                    <li>EMAIL: {userFetch?.email}</li>
                    <li>PHONE: {userFetch?.phone}</li>
                </ul>
            </div>

            <div>
                <h3>AXIOS</h3>
                <button onClick={obtenerConAxios}>Llamada axios</button>
                <ul>
                    <li>ID: {userAxios?.id}</li>
                    <li>NAME: {userAxios?.name}</li>
                    <li>EMAIL: {userAxios?.email}</li>
                    <li>PHONE: {userAxios?.phone}</li>
                </ul>

            </div>
        </>
    )

}

export default ComparacionFetchVsAxios;