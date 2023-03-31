import { Routes, Route } from "react-router";
import Inicio from "./pages/Inicio";
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Inicio/>}/>
      <Route  path='/home' element={<Home/>}/>
    </Routes>
  );
}

export default App;
