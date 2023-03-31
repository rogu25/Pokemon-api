import React from 'react';
import { NavLink } from "react-router-dom";

import s from "../css/CardPokemon.module.css";

function CardPokemon({ id, nombre, imagen, types }) {

  return (
    <React.Fragment>
      <div className={s.card}>
        <NavLink to={"/detalle"} className={s.tNombre}>
          <h3 className={s.tNombre}>{nombre}</h3>
          <img src={imagen} alt="" className={s.img} />
        </NavLink>
        <h5 className={s.tTipos}>
          {
            types.length && types.map((t) => {
              return `${t.name} | `
            })
          }
        </h5>
      </div>
    </React.Fragment>
  )
}

export default CardPokemon;