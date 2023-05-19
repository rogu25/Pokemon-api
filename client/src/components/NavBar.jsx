import React from 'react';
import { NavLink } from "react-router-dom";
import s from "../css/NavBar.module.css";
// import logo_rc from "../img/logo-rc.png";

function NavBar() {
  return (
    <div className={s.contenedor_navbar}>
      <div className={s.nav_logo}>
        <NavLink to={"/"}>
          <img src={"logo_rc"} alt="" className={s.img_logo}/>
        </NavLink>
      </div>
      <div className={s.nav_busqueda}>
        <input type="button" value="Buscar" className={s.btn_buscar} />
        <input type="text" className={s.input_buscar} placeholder='nombre del pokemon...' />
      </div>
    </div>
  )
}

export default NavBar;