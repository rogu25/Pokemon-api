import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { get_id_pokemon } from '../redux/action';

import NavBar from "../components/NavBar";
import CardDetallePokemon from "../components/CardDetallePokemon";

function DetallePokemon() {
  
  const {idPokemon} = useParams();
  
  const dispatch = useDispatch();

  const { detallePokemon } = useSelector((state) => state);
  
  useEffect(() => {
    dispatch(get_id_pokemon(idPokemon));
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
        <NavBar/>
        {
           Object.entries(detallePokemon).length !== 0 && <CardDetallePokemon detalles={detallePokemon}/>
        }
    </React.Fragment>
  )
}

export default DetallePokemon;