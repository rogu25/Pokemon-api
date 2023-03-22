import './App.css';
import { Routes, Route } from "react-router";
import Inicio from "./pages/Inicio";
import Home from './pages/Home';
import Form from './pages/Form';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Inicio/>}/>
      <Route  path='/home' element={<Home/>}/>
      <Route  path='/form' element={<Form/>}/>
    </Routes>
  );
}

export default App;
