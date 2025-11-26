import { useState, type JSX } from "react";

type Producto = {
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
}

function TablaProducto(): JSX.Element {

    const [nombre, setNombre] = useState<string>("");
    const [cantidad, setCantidad] = useState<string>("");
    const [precio, setPrecio] = useState<string>("");

    const [productos, setProductos] = useState<Producto[]>([
        { id: 1, nombre: 'pan', cantidad: 3, precio: 2 },
        { id: 2, nombre: 'libro', cantidad: 3, precio: 25 },
        { id: 3, nombre: 'caja chocolate', cantidad: 3, precio: 12 },
    ]);

    const eliminar = (id: number): void => {
        setProductos(productos.filter(p => p.id !== id));
    }

    const agregar = (productoNuevo: string, cantidadNueva: number, precioNuevo: number): void => {

        if (isNaN(cantidadNueva || precioNuevo)) return;
        if (productoNuevo.trim() === "") return;
        if (cantidadNueva < 1 || precioNuevo < 1) return;

        const maxID = productos.reduce((max, p) => p.id > max ? p.id : max, 0);

        const nuevoProducto: Producto = { id: maxID + 1, nombre: productoNuevo, cantidad: cantidadNueva, precio: precioNuevo };

        setProductos([...productos, nuevoProducto]);

        setNombre("");
        setCantidad("");
        setPrecio("");
    }

    const totalGanancias = productos.reduce((max, p) => max + p.cantidad * p.precio, 0);

    return (
        <>
            <div style={{ border: '5px solid rgba(14, 119, 168, 1)', marginTop: '30px' }}>

                <h1>✔️ Ejercicio 4 – Tabla de productos con total del pedido</h1>

                <table>
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(p => (
                            <tr key={p.id}>
                                <td>{p.nombre}</td>
                                <td>{p.cantidad}</td>
                                <td>{p.precio}</td>
                                <td><button className="eliminar" onClick={() => eliminar(p.id)}>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <br /><br /><br />
                <h3>Añadir producto nuevo: </h3>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="number" placeholder="Cantidad" step={1} min={1} value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                <input type="number" placeholder="Precio" value={precio} min={0.1} onChange={(e) => setPrecio(e.target.value)} />
                <br />
                <button onClick={() => agregar(nombre, Number(cantidad), Number(precio))}>Añadir</button>

                <h3>Total del pedido: {totalGanancias.toFixed(2)}</h3>

            </div>
        </>
    )

}

export default TablaProducto;