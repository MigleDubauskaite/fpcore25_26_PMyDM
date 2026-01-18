import axios from "axios";
import { useState, type FormEvent } from "react";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
}

interface ProductForm {
    name: string;
    category: string;
    price: number;
    inStock: boolean;
}

function CrudProductos3() {

    const BASE_URL = 'https://696ce820f4a79b3151801149.mockapi.io/api/v2/products';

    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<null | Product>(null);

    const productFormEmpty: ProductForm = { name: '', category: '', price: 0, inStock: false };
    const [productForm, setProductForm] = useState<ProductForm>(productFormEmpty);

    const [editingID, setEditingID] = useState<null | string>(null);

    const [searchItem, setSearchItem] = useState<string>("");

    const [sortBy, setSortBy] = useState<'name' | 'category' | 'price'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    // mostrar:
    const getAll = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Product[]>(BASE_URL);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar productos');
        } finally {
            setLoading(false);
        }
    }

    // ver detalle
    const getById = async (id: string) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Product>(`${BASE_URL}/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar detalle del producto');
        } finally {
            setLoading(false);
        }
    }

    // borrar
    const borrar = async (id: string, name: string) => {

        if (!window.confirm(`¿Eliminar el producto '${name}'? `)) return;
        setError(null);
        setLoading(true);

        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error(error);
            setError('Error al borrar el producto');
        } finally {
            setLoading(false);
        }
    }

    // crear
    const create = async (form: ProductForm) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post<Product>(BASE_URL, form);
            setProducts([...products, response.data]);
        } catch (error) {
            console.error(error);
            setError('Error al crear nuevo producto');
        } finally {
            setLoading(false);
        }
    }

    // editar
    const edit = async (id: string, form: ProductForm) => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.put<Product>(`${BASE_URL}/${id}`, form);
            setProducts(products.map(p => p.id !== id ? p : response.data));
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

        if (!productForm.name.trim() || productForm.price <= 0) {
            setError("Los campos nombre y precio son obligatorios");
            return;
        }

        if (editingID !== null) edit(editingID, productForm);
        else create(productForm);


        reset();
    }

    const handleEdit = (product: Product) => {
        setEditingID(product?.id)
        setProductForm({ name: product?.name, category: product?.category, price: product?.price, inStock: product?.inStock })
        setProduct(null);
    }

    const reset = () => {
        setEditingID(null)
        setProductForm({ name: '', category: '', price: 0, inStock: false });
    }

    // filtrar
    const productosFiltrados = products.filter(p => p.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        p.category.toLowerCase().includes(searchItem.toLowerCase()) ||
        p.price.toString().includes(searchItem.toString())
    );

    // ordenar
    const handleSort = (columna: 'name' | 'category' | 'price') => {

        if (columna === sortBy) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        else {
            setSortBy(columna);
            setSortOrder('asc');
        }
    }

    const productosOrdenados = [...productosFiltrados].sort((a, b) => {

        const categoryOrder = { 'Electrónica': 1, 'Ropa': 2, 'Hogar': 3, 'Juguetes': 4 };

        if (sortBy === 'category') {
            const aValue = categoryOrder[a.category as keyof typeof categoryOrder];
            const bValue = categoryOrder[b.category as keyof typeof categoryOrder];
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {

            let valorA = a[sortBy];
            let valorB = b[sortBy];

            if (typeof valorA === 'string') valorA = valorA.toLowerCase();
            if (typeof valorB === 'string') valorB = valorB.toLowerCase();

            if (valorA === valorB) return 0;

            const modifier = sortOrder === 'asc' ? 1 : -1;

            return valorA > valorB ? modifier : -modifier;
        }
    });

    const validar = (): boolean => {

        const errores: string[] = [];

        if (productForm.name.length < 3 || productForm.name.length > 50) errores.push('El nombre tiene que tener entre 3 y 50 caracteres');

        if (productForm.price <= 0) errores.push('Precio solo puede tener valores positivos');

        const categoriasValidas = ['Electrónica', 'Ropa', 'Hogar', 'Juguetes'];
        if (!categoriasValidas.includes(productForm.category)) errores.push('No existe la categoría');

        setValidationErrors(errores);

        return errores.length === 0;
    }


    return (
        <>
            <div style={{ border: '5px solid rgb(207, 250, 89)' }}>

                <h1>PRODUCTOS (CRUD 3)</h1>

                {error !== null && <p className="error">{error}</p>}

                {validationErrors.map((error, i) => (
                    <p key={i} style={{ backgroundColor: 'rgb(255, 143, 143)' }}>{error}</p>
                ))

                }

                <div>
                    <h2>Formulario</h2>
                    <form onSubmit={handleSubmit}>

                        <label>NOMBRE </label>
                        <input
                            type="text"
                            placeholder="Introduce nombre"
                            value={productForm.name}
                            onChange={(e) => { setProductForm({ ...productForm, name: e.target.value }) }} />
                        <br />

                        <label>CATEGORÍA </label>
                        <select value={productForm.category} onChange={(e) => { setProductForm({ ...productForm, category: e.target.value }) }}>
                            <option value="">Elige</option>
                            <option value="Electrónica">Electrónica</option>
                            <option value="Ropa">Ropa</option>
                            <option value="Hogar">Hogar</option>
                            <option value="Juguetes">Juguetes</option>

                        </select>
                        <br />

                        <label>PRECIO </label>
                        <input
                            type="number"
                            value={productForm.price}
                            onChange={(e) => { setProductForm({ ...productForm, price: Number(e.target.value) }) }} />
                        <br />

                        <label>En STOCK </label>
                        <input
                            type="checkbox"
                            checked={productForm.inStock}
                            onChange={(e) => { setProductForm({ ...productForm, inStock: e.target.checked }) }} />
                        <br />

                        <button type="submit">{editingID !== null ? 'Guardar cambios' : 'Crear'}</button>

                        {editingID !== null && <button type="button" onClick={reset}>Cancelar</button>}
                    </form>
                </div>
                <br />

                <button disabled={loading} onClick={() => { getAll(); setProduct(null) }}>cargar productos</button>

                <div>

                    {products.length > 0 &&
                        <>
                            <input type="text" placeholder="Buscar por nombre, categoría o precio"
                                value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />

                            <div style={{ display: 'flex', padding: '15px' }}>
                                <table>
                                    <thead>
                                        <tr>
                                            <td >ID</td>
                                            <td onClick={() => handleSort('name')}>NOMBRE</td>
                                            <td onClick={() => handleSort('category')}>CATEORÍA</td>
                                            <td onClick={() => handleSort('price')}>PRECIO</td>
                                            <td>EN STOCK</td>
                                            <td>ACCIONES</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productosOrdenados.map(p => (
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td>{p.name}</td>
                                                <td>{p.category}</td>
                                                <td>{p.price}</td>
                                                <td>{p.inStock ? 'Sí' : 'No'}</td>
                                                <td>
                                                    <button onClick={() => { getById(p.id) }}>Ver</button>
                                                    <button onClick={() => { handleEdit(p) }}>Editar</button>
                                                    <button onClick={() => { borrar(p.id, p.name) }}>Borrar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {product !== null &&
                                    <>

                                        <div>
                                            <ul>
                                                <li>{product.id}</li>
                                                <li>{product.name}</li>
                                                <li>{product.category}</li>
                                                <li>{product.price}</li>
                                                <li>{product.inStock ? 'Sí' : 'No'}</li>
                                            </ul>
                                            <button onClick={() => setProduct(null)}>Ocultar</button>
                                        </div>
                                    </>
                                }

                            </div>

                        </>
                    }

                </div>

            </div>
        </>
    )
}

export default CrudProductos3;