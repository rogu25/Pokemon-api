import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import s from "../css/NavBar.module.css";
import logo_rc from "../img/logo-rc.png";

import { get_name_pokemon, get_all_pokemons } from '../redux/action';

function NavBar() {

  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const onClickBuscar = () => {

    if (error.length || !nombre.length) {
      return setError("Campo vacio");
    } 
    
    if(nombre.length){
      return dispatch(get_name_pokemon(nombre));
    }
  };

  const onChangeInputBuscar = (evt) => {
    setNombre(evt.target.value);
    if (evt.target.value.length) {
      setError("");
    }else{
      dispatch(get_all_pokemons());
    }
  };

  return (
    <div className={s.contenedor_navbar}>
      <div className={s.nav_logo}>
        <NavLink to={"/"}>
          <img src={logo_rc} alt="" className={s.img_logo} />
        </NavLink>
      </div>
      <div className={s.nav_busqueda}>
        <input type="button" value="Buscar" className={s.btn_buscar} onClick={onClickBuscar} />
        <input type="text" className={s.input_buscar} placeholder='nombre del pokemon...' onChange={onChangeInputBuscar} />
        <span className={s.error}>{error}</span>
      </div>
      <div className={s.link_crear}>
        <NavLink to={"/formulario"}>
        <input type="button" value="Crear Pokemon" className={s.btn_buscar}/>
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar;