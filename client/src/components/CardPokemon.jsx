import React from 'react';

import s from "../css/CardPokemon.module.css";

function CardPokemon({ id, nombre, imagen, types }) {

  return (
    <React.Fragment>
      <div className={s.contenedor}>
        <div className={s.card}>
          <h5>{nombre}</h5>
          <img src={imagen} alt="" className={s.img}/>
          <p>Tipos</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CardPokemon;