import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pokemon from "../components/Pokemon";
import Filtros from '../components/Filtros';
import { get_all_types, get_all_pokemons } from '../redux/action';

import s from "../css/Home.module.css";

function Home() {

  const tipos = useSelector((state) => state.tipos);
  const pokemons = useSelector((state) => state.pokemons);
  const filtroTipos = useSelector((state) => state.filtroTipo);

  const [back, setBack] = useState(0);
  const [next, setNext] = useState(12);
  const [id, setId] = useState(1);

  const items = 12;
  const paginadoPokemons = Math.ceil(pokemons.length / items);
  const paginadoFiltros = Math.ceil(filtroTipos.length / items);
  
  const dispatch = useDispatch();

  const selectPage = (id) => {
    setNext(items * id);
    setBack((items * id) - items);
    setId(id);
  }
  const backPage = () => {
    if (id <= 1) return
    setId(id - 1);
    setNext(next - items);
    setBack(back - items);
  }
  const nextPage = () => {
    if (id < paginadoPokemons || id < paginadoFiltros) {
      setId(id + 1);
      setNext(next + items);
      setBack(back + items);
    }
  }
  useEffect(() => {
    dispatch(get_all_types());
    dispatch(get_all_pokemons())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return filtroTipos.length ? (
    <div className={s.content_home}>
      <div>
        <Filtros tipos={tipos} />
      </div>
      <div className={s.contenedorBtnPage}>
        <button
          onClick={backPage}
          className={s.btn_page_next}
        >
          {"<<"}
        </button>
        {
          filtroTipos.map((e, i) => {
            if(i < paginadoFiltros){
              return (
                <button
                  key={e.id}
                  id={i + 1}
                  disabled={id === (i + 1) ? true : false}
                  className={id === (i + 1) ? s.btn_active : s.btn_page}
                  onClick={() => selectPage(i+1)}>
                  {i + 1}
                </button>
              )
            }
            return false
          }) 
        }
        <button
          onClick={nextPage}
          className={s.btn_page_next}
        >
          {">>"}
        </button>
      </div>
      {
        <Pokemon pokemons={filtroTipos} />
      }
    </div>
  ) : (
    <div className={s.content_home}>
      <div>
        <Filtros tipos={tipos} />
      </div>
      <div className={s.contenedorBtnPage}>
        <button
          onClick={backPage}
          className={s.btn_page_next}
        >
          {"<<"}
        </button>
        {
            pokemons.map((e, i) => {
              if(i < paginadoPokemons){
                return (
                  <button
                    key={e.id}
                    id={i + 1}
                    disabled={id === (i + 1) ? true : false}
                    className={id === (i + 1) ? s.btn_active : s.btn_page}
                    onClick={() => selectPage(i+1)}>
                    {i + 1}
                  </button>
                )
              }
              return false
            })
        }
        <button
          onClick={nextPage}
          className={s.btn_page_next}
        >
          {">>"}
        </button>
      </div>
      {
        <Pokemon pokemons={pokemons} pageActual={back} nextPage={next} />
      }
    </div> 
  )
}

export default Home;