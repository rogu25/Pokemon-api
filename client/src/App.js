import React from "react";
import { Routes, Route } from "react-router";
import Inicio from "./pages/Inicio";
import Home from './pages/Home';
import DetallePokemon from "./pages/DetallePokemon";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path='/' element={<Inicio />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detalle/:idPokemon' element={<DetallePokemon />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
