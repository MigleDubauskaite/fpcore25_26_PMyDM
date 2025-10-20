import "./App.css";
import Salu2 from "./components/Salu2";
import Saludo from "./components/Saludo";

// retorna un elemento único (pero puede tener subelementos dentro)
function App() {
  return (
    <div>
      Soy el elemento único y tengo los subelementos:®️ <Saludo />{" "}
      <Salu2 nombre={"Migle"} edad={21} /> <Salu2 nombre={"Loli"} edad={36} />
    </div>
  );
}

export default App;
