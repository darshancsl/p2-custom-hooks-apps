import { Route, Routes } from "react-router-dom";
import './App.css';
import Pokedex from "./pages/Pokedex/Pokedex";
import PokeDetails from "./Components/PokeDetails";

function App() {
  return (
    <div className="main overflow-hidden">
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="pokemon/:id" element={<PokeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
