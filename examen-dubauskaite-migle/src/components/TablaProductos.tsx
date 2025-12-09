import { useState, type JSX } from "react";

type Producto = {
    id: number;
    nombre: string;
    precio: number;
}

function TablaProductos(): JSX.Element {

    const [nombreProducto, setNombreProducto] = useState<string>("");
    const [precio, setPrecio] = useState<string>("");

    const [productos, setProductos] = useState<Producto[]>([
        { id: 1, nombre: 'Libro', precio: 10.50 },
        { id: 2, nombre: 'Revista', precio: 3 }
    ]);

    const precioTotal = productos.reduce((suma, precio) => suma + precio.precio, 0);

    const agregarProducto = (): void => {

        const maxId = productos.reduce((max, p) => p.id > max ? p.id : max, 0);

        const precioN = Number(precio);

        if (isNaN(precioN)) return;
        if (precioN < 0 || precioN > 1000) return;
        if (nombreProducto.trim() === "" || precio.trim() === "") return;
        if (productos.length === 5) {
            alert("No puedes agregar nuevo producto... (MAX:5)");
            setNombreProducto("");
            setPrecio("");
            return;
        }

        const nuevo: Producto = { id: maxId + 1, nombre: nombreProducto, precio: precioN };

        setProductos([...productos, nuevo]);
        setNombreProducto("");
        setPrecio("");
    }

    const eliminar = (id: number): void => {
        setProductos(productos.filter(p => p.id !== id));
    }

    return (
        <>
            <div style={{ border: '5px solid #543', padding: '30px' }}>

                <h1>TABLA DE PRODUCTOS CON PRECIO TOTAL</h1>

                <input
                    type="text"
                    placeholder="Nombre producto"
                    value={nombreProducto}
                    onChange={(e) => setNombreProducto(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Precio(0-1000)"
                    value={precio}
                    min={0}
                    max={1000}
                    step={0.1}
                    onChange={(e) => setPrecio(e.target.value)} />

                <br /> <br />

                <button onClick={() => agregarProducto()} className="agregar">Agregar</button>

                <br /> <br />

                <table>
                    <thead>
                        <tr>
                            <th>PRODUCTO</th>
                            <th>PRECIO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(p => (
                            <tr key={p.id}>
                                <td>{p.nombre}</td>
                                <td>{p.precio.toFixed(2)} €</td>
                                <td><button onClick={() => eliminar(p.id)} className="eliminar">Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Número de productos: {productos.length}/{5}</h3>

                <h3>Precio total: {precioTotal.toFixed(2)} €</h3>

                {productos.length === 0 && <p className="mensajeVacio">No hay todavía ningún producto...</p>}


            </div>
        </>
    )
}

export default TablaProductos;