import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pokemon from "../components/Pokemon";
import Filtros from '../components/Filtros';
import { get_all_types, get_all_pokemons } from '../redux/action';

function Home() {
  
  const tipos = useSelector((state) => state.tipos);
  const pokemons = useSelector((state) => state.pokemons);
  const filtroTipos = useSelector((state) => state.filtroTipo);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_all_types());
    dispatch(get_all_pokemons())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <Filtros tipos={tipos}/>
      {
        filtroTipos.length ? <Pokemon pokemons={filtroTipos}/> : <Pokemon pokemons={pokemons}/>
      }
    </div>
  );
}

export default Home;