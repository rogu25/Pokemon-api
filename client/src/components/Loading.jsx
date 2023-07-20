import React from 'react';

import s from "../css/Loading.module.css";

function Loading({ mensaje }) {

  return (
    <div className={s.contenedor_load}>
      <p className={s.title_error}>{"Cargando...."}</p>
      <div className={s.content_btn}>
        {
          mensaje ? <p className={s.content_mensaje}>{mensaje}</p> : ""
        }
      </div>
    </div>
  )
}

export default Loading;