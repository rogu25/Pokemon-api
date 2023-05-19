import React from "react";
import { Routes, Route } from "react-router";
import Inicio from "./pages/Inicio";
import Home from './pages/Home';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path='/' element={<Inicio />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
