import React from 'react';
import { NavLink } from "react-router-dom";
import s from "../css/inicio.module.css";

function Inicio() {

  return (
    <React.Fragment>
      <div className={s.contenedor}>
        <div className={s.contenedorTitulo}>
          <h2 className={s.subTitulo}>Bienvenidos a...</h2>
          <h1 className={s.titulo}>Api Pokemon</h1>
          <div className={s.btnStart}>
            <NavLink to={"/home"} className={s.btn}>
              Start
            </NavLink>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Inicio;