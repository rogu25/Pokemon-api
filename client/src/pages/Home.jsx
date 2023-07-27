import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pokemon from "../components/Pokemon";
import {
  get_all_types,
  get_all_pokemons,
  filtrosPokemons
} from '../redux/action';
import { customFilter } from '../hooks/Custom';

import s from "../css/Home.module.css";
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';

function Home() {

  const tipos = useSelector((state) => state.tipos);
  const {pokemons, mensaje} = useSelector((state) => state);
  const { origen, orden, tipo, filtrados, total} = useSelector((state) => state.pokemonsFiltrados);
  
  const [back, setBack] = useState(0);
  const [next, setNext] = useState(12);
  const [id, setId] = useState(1);
  const [filtros, setFiltros] = useState({ origen, orden, tipo, filtrados, total });

  const items = 12;
  const totalPokes = Math.ceil(total / items);

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
    if (id < totalPokes) {
      setId(id + 1);
      setNext(next + items);
      setBack(back + items);
    }
  }

  const onChangeSelectedOrigen = (evt) => {
    setFiltros((prev) => ({ ...prev, origen: evt.target.value, orden, tipo, filtrados: pokemons, total }));
  }
  const onChangeSelectedOrder = (evt) => {
    setFiltros((prev) => ({ ...prev, origen, orden: evt.target.value, tipo, filtrados, total }));
  }
  const onChangeSelectedTypes = (evt) =>{ 
    setFiltros((prev) => ({ ...prev, origen, orden, tipo: evt.target.value, filtrados: pokemons, total }));
  }

  useEffect(() => {
    dispatch(get_all_types());
    dispatch(get_all_pokemons());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let newFiltros = customFilter(filtros);
    dispatch(filtrosPokemons(newFiltros));
    // eslint-disable-next-line
  }, [filtros]);

  return (
    <React.Fragment>
      <NavBar />
      <div className={s.content_home}>
        <div className={s.content_filtros}>
          <div className={s.contenedor_filtros}>
            <div className={s.f_origen + " " + s.filtros}>
              <label><h4>Origen</h4></label>
              <select className={s.btn_filtros} id='origen' onChange={onChangeSelectedOrigen}>
                <option value="all">Todos</option>
                <option value="db">DB</option>
                <option value="api">API</option>
              </select>
            </div>

            <div className={s.f_orden + " " + s.filtros}>
              <label><h4>Orden</h4></label>
              <select className={s.btn_filtros} id='orden' onChange={onChangeSelectedOrder}>
                <option value={"all"}>Seleccionar</option>
                <option value="asc">Aa-Zz</option>
                <option value="desc">Zz-Aa</option>
                <option value="mas">Más Poder</option>
                <option value="menos">Menos Poder</option>
              </select>
            </div>

            <div className={s.f_tipos + " " + s.filtros}>
              <label><h4>Tipos</h4></label>
              <select className={s.btn_filtros} id='tipo' onChange={onChangeSelectedTypes}>
                <option value="all">Todos</option>
                {
                  tipos.length && tipos.map((t) => {
                    return <option key={t.id} value={t.name}>{t.name}</option>
                  })
                }
              </select>
            </div>

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
            filtrados.length && filtrados.map((e, i) => {
              if (i < totalPokes) {
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
            disabled={totalPokes === 1 ? true : false}
            onClick={nextPage}
            className={s.btn_page_next}
          >
            {">>"}
          </button>
        </div>
        {
          filtrados.length ? <Pokemon pokemons={filtrados} pageActual={back} nextPage={next}/> : <Loading mensaje={mensaje&&mensaje}/> 
        }
      </div>
    </React.Fragment>
  )

}

export default Home;