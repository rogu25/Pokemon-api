import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pokemon from "../components/Pokemon";
import {
  get_all_types,
  get_all_pokemons,
  filtroPorTipo,
  filtrarXorden
} from '../redux/action';

import s from "../css/Home.module.css";

function Home() {

  const tipos = useSelector((state) => state.tipos);
  const pokemons = useSelector((state) => state.filtrosPokemons);

  const [back, setBack] = useState(0);
  const [next, setNext] = useState(12);
  const [id, setId] = useState(1);

  const items = 12;
  const totalPokemons = Math.ceil(pokemons.length / items);

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

    if (id < totalPokemons) {
      setId(id + 1);
      setNext(next + items);
      setBack(back + items);
    }
  }
  const selectType = (evt) => {
    dispatch(filtroPorTipo(evt.target.value));
  }

  useEffect(() => {
    dispatch(get_all_pokemons());
    dispatch(get_all_types());
  }, []);

  return (
    <div className={s.content_home}>
      <div className={s.content_filtros}>
        <h4 className={s.titulo_filtros}>Filtrados</h4>
        <div>
          <select className={s.btn_filtros} onChange={(evt) => dispatch(filtrarXorden(evt.target.value))}>
            <option >Orden</option>
            <option value="asc">Aa-Zz</option>
            <option value="desc">Zz-Aa</option>
          </select>
          <select className={s.btn_filtros} onChange={selectType}>
            <option >Tipos</option>
            <option value="all">All</option>
            {
              tipos.length && tipos.map((t) => {
                return <option key={t.id} value={t.name}>{t.name}</option>
              })
            }
          </select>
          <button className={s.btn_filtros}>Existencia</button>
          <button className={s.btn_filtros}>Fuerza +</button>
        </div>
      </div>
      <div className={s.contenedorBtnPage}>
        <button
          onClick={backPage}
          className={s.btn_page_next}
        >
          {"<<"}
        </button>
        {
          pokemons.length && pokemons.map((e, i) => {
            if (i < totalPokemons) {
              return (
                <button
                  key={e.id}
                  id={i + 1}
                  disabled={id === (i + 1) ? true : false}
                  className={id === (i + 1) ? s.btn_active : s.btn_page}
                  onClick={() => selectPage(i + 1)}>
                  {i + 1}
                </button>
              )
            }
            return false
          })
        }
        <button
          disabled={pokemons === 1 ? true : false}
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