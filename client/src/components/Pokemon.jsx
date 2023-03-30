import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {get_all_pokemons} from "../redux/action";
import CardPokemon from "./CardPokemon";

function Pokemon() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons)

  useEffect(() => {
    dispatch(get_all_pokemons())
  },[])

  return (
    <React.Fragment>
      {
        pokemons.length && pokemons.map((p) => {
          return (
            <div key={p.id}>
              <CardPokemon id={p.id} nombre={p.nombre} imagen={p.imagen} types={p.types}/>
            </div>
          )
        })
      }
    </React.Fragment>
  )
}

export default Pokemon;