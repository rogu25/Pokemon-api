import React from 'react';

import CardPokemon from "./CardPokemon";

import s from "../css/CardPokemon.module.css";

function Pokemon({ pokemons, pageActual, nextPage }) {

  return (
    <div className={s.contenedor}>
      {
        pokemons.slice(pageActual, nextPage).map((p) => {
          return (
            <div key={p.id}>
              <CardPokemon id={p.id} nombre={p.nombre} fuerza={p.fuerza} imagen={p.imagen} types={p.types} />
            </div>
          )
        })
      }
    </div>
  )

}

export default Pokemon;