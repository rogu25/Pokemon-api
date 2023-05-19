import React from 'react';

import s from "../css/Loading.module.css";
import pokebola from "../img/pokebola.png";

function Loading({mensaje}) {
  return (
    <div className={s.contenedor_load}>
      <div className={s.card_error}>
      <h2 className={s.title_error}>Error de carga</h2>
      <img className={s.pokebola} src={pokebola} alt="" />
      </div>
      <h2 className={s.error}>{mensaje}</h2>
    </div>
  )
}

export default Loading;