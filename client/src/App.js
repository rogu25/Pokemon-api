import React from "react";
import { Routes, Route } from "react-router";
import Inicio from "./pages/Inicio";
import Home from './pages/Home';
import DetallePokemon from "./pages/DetallePokemon";
import FormPokemon from "./pages/FormPokemon";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path='/' element={<Inicio />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detalle/:idPokemon' element={<DetallePokemon />} />
        <Route path='/formulario' element={ <FormPokemon/> } />
      </Routes>
    </React.Fragment>
  );
}

export default App;
