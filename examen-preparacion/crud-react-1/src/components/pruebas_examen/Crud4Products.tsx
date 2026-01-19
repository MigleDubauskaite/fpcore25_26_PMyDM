import axios from "axios";
import { useState, type FormEvent } from "react";

interface Producto {
    id: number;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
}

interface FormProducto {
    name: string;
    category: string;
    price: number;
    inStock: boolean;
}

function Crud4Products() {

    const BASE_URL = 'https://696ce820f4a79b3151801149.mockapi.io/api/v2/products';

    const [error, setError] = useState<null | string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [productos, setProductos] = useState<Producto[]>([]);
    const [producto, setProducto] = useState<null | Producto>(null);

    const formProductoVacio: FormProducto = { name: '', category: '', price: 0, inStock: false };
    const [formProducto, setFormProducto] = useState<FormProducto>(formProductoVacio);

    const [editingID, setEditingID] = useState<null | number>(null);

    const [searchItem, setSearchItem] = useState<string>("");

    const [sortBy, setSortBy] = useState<'id' | 'name' | 'category' | 'price' | 'inStock'>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    // 1: mostrar
    const getAll = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Producto[]>(BASE_URL);
            setProductos(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar productos');
        } finally {
            setLoading(false);
        }
    }

    // 2: detalle
    const getById = async (id: number) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Producto>(`${BASE_URL}/${id}`);
            setProducto(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar detalle del producto');
        } finally {
            setLoading(false);
        }
    }

    // 3: eliminar
    const borrar = async (id: number, name: string) => {

        if (!window.confirm(`¿Quieres borrar el producto '${name}'`)) return;

        setError(null);
        setLoading(true);

        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setProductos(productos.filter(p => p.id !== id));
        } catch (error) {
            console.error(error);
            setError('Error al borrar el producto');
        } finally {
            setLoading(false);
        }
    }

    // 4: crear
    const crearProducto = async (form: FormProducto) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post<Producto>(BASE_URL, form);
            setProductos([...productos, response.data]);
        } catch (error) {
            console.error(error);
            setError('Error al crear el producto');
        } finally {
            setLoading(false);
        }
    }

    // 5: editar
    const editarProducto = async (id: number, form: FormProducto) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.put<Producto>(`${BASE_URL}/${id}`, form);
            setProductos(productos.map(p => p.id === id ? response.data : p));
        } catch (error) {
            console.error(error);
            setError('Error al editar el producto');
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validar()) return;

        if (editingID !== null) editarProducto(editingID, formProducto);
        else crearProducto(formProducto);

        reset();
    }

    const handleEdit = (producto: Producto) => {
        setEditingID(producto.id);
        setFormProducto({ name: producto.name, category: producto.category, price: producto.price, inStock: producto.inStock });
        setProducto(null);
    }

    const reset = () => {
        setEditingID(null);
        setFormProducto({ name: '', category: '', price: 0, inStock: false });
    }

    // filtrar
    const productosFiltrados = productos.filter(p =>
        p.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        p.category.toLowerCase().includes(searchItem.toLowerCase()) ||
        p.price.toString().toLowerCase().includes(searchItem.toLowerCase())
    )

    // ordenar
    const handleSort = (columna: 'id' | 'name' | 'category' | 'price' | 'inStock') => {

        if (sortBy === columna) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        else {
            setSortBy(columna);
            setSortOrder('asc');
        }
    }

    const productosOrdenados = [...productosFiltrados].sort((a, b) => {

        const categoryPriority = { 'Electrónica': 1, 'Ropa': 2, 'Hogar': 3, 'Juguetes': 4 };
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'category') {
            const aValue = categoryPriority[a.category as keyof typeof categoryPriority];
            const bValue = categoryPriority[b.category as keyof typeof categoryPriority];
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (sortBy === 'price' || sortBy === 'id') {
            return sortOrder === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
        } else if (sortBy === 'inStock') {
            return sortOrder === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue); //F:0 - V:1
        } else {
            if (typeof aValue === 'string') aValue = aValue.toLowerCase();
            if (typeof bValue === 'string') bValue = bValue.toLowerCase();

            if (aValue === bValue) return 0;

            const modifier = sortOrder === 'asc' ? 1 : -1;
            return aValue > bValue ? modifier : -modifier;
        }
    })

    // validaciones
    const validar = (): boolean => {

        const errores: string[] = [];
        const categoriasValidas = ['Electrónica', 'Ropa', 'Hogar', 'Juguetes'];

        if (formProducto.name.length <= 3 || formProducto.name.length >= 50) errores.push('El nombre no cumple requisitos. intenta de nuevo');
        if (formProducto.price <= 0) errores.push('El precio no puede tener valores negativos o 0');
        if (!categoriasValidas.includes(formProducto.category)) errores.push('Selecciona categoría válida');

        setValidationErrors(errores);

        return errores.length === 0;
    }


    return (
        <>
            <div style={{ border: '5px solid #a5588f' }}>

                {error !== null && <p>{error}</p>}

                {validationErrors.map((error, i) =>
                    <ul key={i}>
                        <li style={{ color: 'red' }}>{error}</li>
                    </ul>
                )}

                <h1>Productos: CRUD 4</h1>

                <div>
                    <h3>Formulario</h3>
                    <form onSubmit={handleSubmit}>
                        <label>nombre: </label>
                        <input
                            type="text"
                            placeholder="nombre..."
                            value={formProducto.name}
                            onChange={(e) => setFormProducto({ ...formProducto, name: e.target.value })} />
                        <br />

                        <label>categoria: </label>
                        <select value={formProducto.category} onChange={(e) => { setFormProducto({ ...formProducto, category: e.target.value }) }}>
                            <option value="">elige</option>
                            <option value="Electrónica">Electrónica</option>
                            <option value="Ropa">Ropa</option>
                            <option value="Hogar">Hogar</option>
                            <option value="Juguetes">Juguetes</option>
                        </select>
                        <br />

                        <label>precio: </label>
                        <input
                            type="number"
                            value={formProducto.price}
                            onChange={(e) => setFormProducto({ ...formProducto, price: Number(e.target.value) })} />
                        <br />

                        <label>En Stock: </label>
                        <input
                            type="checkbox"
                            checked={formProducto.inStock}
                            onChange={(e) => setFormProducto({ ...formProducto, inStock: e.target.checked })} />
                        <br />

                        <button type="submit">{editingID !== null ? 'Guardar cambios' : 'Crear'}</button>
                        <br /><br /><br />
                        {editingID !== null && <button type="button" onClick={reset}>Cancelar</button>}

                    </form>
                </div>

                <button disabled={loading} onClick={() => { getAll(); setProducto(null) }}>{loading ? 'Cargando...' : 'Cargar productos'}</button>


                {loading && <p>Cargando...</p>}

                {producto !== null &&
                    <div>
                        <ol>
                            <li>{producto.id}</li>
                            <li>{producto.name}</li>
                            <li>{producto.category}</li>
                            <li>{producto.price}</li>
                            <li>{producto.inStock ? 'SI' : 'NO'}</li>
                        </ol>
                        <button onClick={() => setProducto(null)}>Ocultar</button>
                    </div>
                }

                <br />

                {productos.length > 0 &&
                    <>
                        <input type="text" placeholder="buscar por nombre, categoria, precio" onChange={(e) => setSearchItem(e.target.value)} />
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('id')}>id</th>
                                        <th onClick={() => handleSort('name')}>name</th>
                                        <th onClick={() => handleSort('category')}>category</th>
                                        <th onClick={() => handleSort('price')}>price</th>
                                        <th onClick={() => handleSort('inStock')}>inStock</th>
                                        <th>acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosOrdenados.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td>{p.name}</td>
                                            <td>{p.category}</td>
                                            <td>{p.price}</td>
                                            <td>{p.inStock ? 'SI' : 'NO'}</td>
                                            <td>
                                                <button onClick={() => { getById(p.id) }}>Ver</button>
                                                <button onClick={() => { handleEdit(p) }}>Editar</button>
                                                <button onClick={() => borrar(p.id, p.name)}>Borrar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                }



            </div>
        </>
    )
}

export default Crud4Products;