import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import s from "../css/Inicio.module.css";
import { useDispatch } from 'react-redux';
import { get_all_pokemons, get_all_types} from '../redux/action';

function Inicio() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_all_pokemons())
    dispatch(get_all_types());
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className={s.contenedor}>
        <div className={s.contenedorTitulo}>
          <h2 className={s.subTitulo}>Bienvenidos a...</h2>
          <h1 className={s.titulo}>Api Pokemon</h1>
          <div className={s.btnStart}>
            <NavLink to={"/home"} className={s.btn}>
              Start
            </NavLink>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Inicio;