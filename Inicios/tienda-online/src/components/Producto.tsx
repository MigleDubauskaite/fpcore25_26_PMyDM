type Producto = {
  nombre: String;
  precio: number;
  disponible: boolean;
};

function Producto({ nombre, precio, disponible }: Producto) {
  return (
    <div
      className="productos"
      style={
        { border: `3px solid ${disponible ? "green" : "red"}` }
    }
    >
      <h4 id="nombre-producto">{nombre}</h4>
      <p>{precio.toFixed(2)} €</p>
      <p id="disponible">{disponible ? "✅En stock" : "❌Agotado"} </p>
    </div>
  );
}

export default Producto;
