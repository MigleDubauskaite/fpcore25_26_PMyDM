import { useState } from "react";
import { apiFotos, apiProducts, apiUsers } from "../services/api";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
}

interface Foto {
    id: number;
    author: string;
    download_url: string;
    width: number;
    height: number;
}

function MultipleApis() {

    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [fotos, setFotos] = useState<Foto[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const obtenerUsers = async () => {

        setLoading(true);

        try {
            const response = await apiUsers.get<User[]>('/users');
            setUsers(response.data);
        } catch (error) {
            console.error(`Error obteniendo los usuarios ${error}`);
        } finally {
            setLoading(false);
        }
    }

    const obtenerProducts = async () => {

        setLoading(true);

        try {
            const response = await apiProducts.get<Product[]>('/products');
            setProducts(response.data);
        } catch (error) {
            console.error(`Error obteniendo los productos ${error}`);
        } finally {
            setLoading(false);
        }
    }

    const obtenerFotos = async () => {

        setLoading(true);

        try {
            const response = await apiFotos.get<Foto[]>('/v2/list');
            setFotos(response.data);
        } catch (error) {
            console.error(`Error obteniendo las fotos ${error}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h2>El uso de Apis</h2>
            {/* mientras esta haciendo la petición estará deshabilitando el boton ---> disabled=true */}
            {/* loading: esperando de forma ordenada al hacer otra petición para que no se atasque*/}
            <button
                onClick={obtenerUsers}
                disabled={loading}>{loading ? 'Cargando' : 'Mostrar lista usuarios'}
            </button>

            <ul>
                {users.map(u => (
                    <li key={u.id}><b>nombre:</b> {u.name} -- <b>email:</b> {u.email} -- <b>phone:</b> {u.phone}</li>
                ))}
            </ul>


            <hr />
            <br /><br />
            <button disabled={loading} onClick={obtenerProducts}>{loading ? 'Cargando...' : 'Mostrar lista productos'}</button>

            <ul>
                {products.map(u => (
                    <li key={u.id}><b>title:</b> {u.title} -- <b>price:</b> {u.price} -- <b>category:</b> {u.category}</li>
                ))}
            </ul>

            <hr />
            <br /><br />

            <button disabled={loading} onClick={obtenerFotos}>{loading ? 'Cargando...' : 'Mostrar lista fotos'}</button>

            <br />

            {fotos.map(f => (
                <div key={f.id}>
                    <img src={f.download_url} alt="fotos" width={f.width/30} height={f.height/30} />
                    <figcaption style={{ fontStyle: "oblique", color: '#839e2aff' }}>{f.author}</figcaption>
                    <br />
                </div>
            ))}

        </>
    )
}

export default MultipleApis