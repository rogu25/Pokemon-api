import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { get_all_pokemons } from "../redux/action";
import CardPokemon from "./CardPokemon";

import s from "../css/CardPokemon.module.css";

function Pokemon() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons)

  useEffect(() => {
    dispatch(get_all_pokemons())
  }, [])

  if (pokemons.length) {
    return (
      <div className={s.contenedor}>
        {
          pokemons.map((p) => {
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