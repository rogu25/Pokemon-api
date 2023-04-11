import React from 'react';

import CardPokemon from "./CardPokemon";

import s from "../css/CardPokemon.module.css";

function Pokemon({pokemons, pageActual, nextPage, mensaje}) {

  if (pokemons.length) {
    return (
      <div className={s.contenedor}>
        {
          mensaje ? <div className={s.card}>
              <span className={s.mensaje}>{mensaje}</span>
            </div> : 
          pokemons.slice(pageActual,nextPage).map((p) => {
            return (
              <div key={p.id}>
                <CardPokemon id={p.id} nombre={p.nombre} imagen={p.imagen} types={p.types} />
              </div>
            )
          })
        }
      </div>
    );
  } else {
    return (
      <div className={s.contenedorError}>

        <p>
          {`No se econtraron pokemones, posible Error...  ${pokemons.mensaje}`}
        </p>

      </div>
    );
  }


}

export default Pokemon;