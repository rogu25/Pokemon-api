import React from 'react';

import CardPokemon from "./CardPokemon";

import s from "../css/CardPokemon.module.css";
import Loading from './Loading';

function Pokemon({pokemons, pageActual, nextPage, mensaje}) {

  if (pokemons.length) {
    return (
      <div className={s.contenedor}>
        {
          pokemons.slice(pageActual, nextPage).map((p) => {
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
      <Loading mensaje={mensaje}/>
    );
  }


}

export default Pokemon;