import React from 'react';
import { NavLink } from "react-router-dom";

import s from "../css/CardPokemon.module.css";

function CardPokemon({ id, nombre, fuerza, imagen, types }) {

  return (
    <React.Fragment>
      <div className={s.card}>
        <NavLink to={`/detalle/${id}`} className={s.tNombre}>
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
        <span><h6>{`Power: ${fuerza}`}</h6></span>
      </div>
    </React.Fragment>
  )
}

export default CardPokemon;