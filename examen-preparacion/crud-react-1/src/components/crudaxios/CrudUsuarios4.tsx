import axios from "axios";
import { useState, type FormEvent } from "react";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string,
    images: string[],
}

interface ProductForm {
    title: string;
    price: number;
    description: string,
    categoryId: number,
    images: string[],
}

function CrudUsuario4() {

    const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<null | Product>(null);

    const productFormEmpty: ProductForm = { title: '', price: 0, images: [''], description: '', categoryId: 2 };
    const [productForm, setProductForm] = useState<ProductForm>(productFormEmpty);

    const [editingID, setEditingID] = useState<null | number>(null);

    // todos productos
    const mostrarProductos = async () => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Product[]>(BASE_URL);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar productos...');
        } finally {
            setLoading(false);
        }
    }

    // un producto
    const mostrarUnProducto = async (id: number) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.get<Product>(`${BASE_URL}/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al mostrar el producto...');
        } finally {
            setLoading(false);
        }
    }

    // delete
    const eliminarUnProducto = async (id: number) => {

        if (!window.confirm(`¿Seguro que quiere eliminar el producto de identificación ${id} de la lista?`)) return;

        setError(null);
        setLoading(true);

        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error(error);
            setError('Error al borrar el producto...');
        } finally {
            setLoading(false);
        }
    }

    // crear
    const crearNuevoProducto = async (formData: ProductForm) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.post<Product>(BASE_URL, formData);
            setProducts([...products, response.data]);
            reset();
        } catch (error) {
            console.error(error);
            setError('Error al crear el nuevo producto...');
        } finally {
            setLoading(false);
        }
    }

    // editar
    const editarUnProducto = async (id: number, formData: ProductForm) => {

        setError(null);
        setLoading(true);

        try {
            const response = await axios.put<Product>(`${BASE_URL}/${id}`, formData);
            setProducts(products.map(p => p.id === id ? response.data : p));
            reset();
        } catch (error) {
            console.error(error);
            setError('Error al editar el producto...');
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!productForm.title.trim() || productForm.price < 0) {
            setError('Intenta de nuevo... Los datos no pueden ser nulos o negativos');
            return;
        }

        if (!productForm.images[0].trim()) {
            setError('La imagen es obligatoria');
            return;
        }

        if (editingID !== null) editarUnProducto(editingID, productForm);
        else crearNuevoProducto(productForm);
    }

    const handleEdit = (p: Product) => {
        setEditingID(p.id);
        setProductForm({ title: p.title, price: p.price, images: p.images, description: p.description, categoryId: 1 });
    }

    const reset = () => {
        setEditingID(null);
        setProductForm({ title: '', price: 0, images: [''], description: '', categoryId: 1 });
    }

    return (
        <>
            <div style={{ border: '5px solid rgb(161, 118, 247)' }}>
                <h1>CRUD 4</h1>

                <div style={{ margin: '30px', border: '3px solid #82ff71' }}>

                    <form onSubmit={handleSubmit}>
                        <label>TITLE</label>
                        <input type="text" placeholder="Titulo" value={productForm.title}
                            onChange={(e) => { setError(null); setProductForm({ ...productForm, title: e.target.value }) }} />
                        <br />

                        <label>Price</label>
                        <input type="number" value={productForm.price}
                            onChange={(e) => { setError(null); setProductForm({ ...productForm, price: Number(e.target.value) }) }} />

                        <br />
                        <label>Image</label>
                        <input type="text" placeholder="URL de imagen" value={productForm.images[0]}
                            onChange={(e) => { setError(null); setProductForm({ ...productForm, images: [e.target.value] }) }} />

                        <br />

                        <label>Description</label>
                        <input type="text" placeholder="descripcion" value={productForm.description}
                            onChange={(e) => { setError(null); setProductForm({ ...productForm, description: e.target.value }) }} />

                        <br />


                        <br /><br />

                        <button disabled={loading} type="submit">{editingID !== null ? 'Editar' : 'Crear'}</button>

                        {editingID !== null && <button type="button" onClick={reset}>Cancelar</button>}

                        <br />
                    </form>
                </div>

                {error && <p style={{ fontStyle: 'oblique', color: 'red' }}>Error: {error}</p>}

                <button disabled={loading} onClick={() => { mostrarProductos(); setProduct(null) }}>Mostrar lista de PRODUCTOS</button>

                {product !== null &&
                    <>
                        <div style={{ margin: '30px', border: '3px solid #71aaff' }}>
                            <h3>{product.title}</h3>
                            <ul>
                                <li>ID: {product.id}</li>
                                <li>TITLE: {product.title}</li>
                                <li>PRICE: {product.price}</li>
                                <img src={product.images[0]} alt={product.title} style={{ height: '80px', width: '80px' }} />
                            </ul>
                        </div>
                    </>
                }

                {products.length > 0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>PRICE</th>
                                <th>IMAGE</th>
                                <th>DESCRIPTION</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id}>
                                    <th>{p.id}</th>
                                    <th>{p.title}</th>
                                    <th>{p.price}</th>
                                    <th><img src={p.images[0]} alt="" style={{ height: '50px', width: '50px' }} /></th>
                                    <th>{p.description}</th>
                                    <th>
                                        <button disabled={loading} onClick={() => mostrarUnProducto(p.id)}>Ver</button>
                                        <button disabled={loading} onClick={() => eliminarUnProducto(p.id)}>❌</button>
                                        <button disabled={loading} onClick={() => handleEdit(p)}>✏️</button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

            </div>
        </>
    )
}

export default CrudUsuario4;