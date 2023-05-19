import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pokemon from "../components/Pokemon";
import {
  get_all_types,
  filtrosPokemons,
  get_all_pokemons
} from '../redux/action';

import s from "../css/Home.module.css";
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';

function Home() {

  const tipos = useSelector((state) => state.tipos);
  const { key, pokemon } = useSelector((state) => state.pokemonsFiltrados);

  const [back, setBack] = useState(0);
  const [next, setNext] = useState(12);
  const [id, setId] = useState(1);
  const [filtros, setFiltros] = useState({ key: "type", valor: "all" })

  const items = 12;
  const totalPokemons = Math.ceil(pokemon.length / items);

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

  useEffect(() => {
    dispatch(get_all_types());
    dispatch(get_all_pokemons());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(filtrosPokemons(filtros))
    // eslint-disable-next-line
  }, [filtros]);

  return (
    <React.Fragment>
      <NavBar/>
      <div className={s.content_home}>
        <div className={s.content_filtros}>
          <div className={s.contenedor_filtros}>
          <div className={s.f_origen + " " + s.filtros}>
              <label>Origen</label>
              <select className={s.btn_filtros} id='existencia' onChange={(evt) => {
                setFiltros({ key: evt.target.id, valor: evt.target.value });
              }}>
                <option value={"all"}>All</option>
                <option value="db">Db</option>
                <option value="api">Api</option>
              </select>
            </div>
            <div className={s.f_orden + " " + s.filtros}>
              <label>Orden</label>
              <select className={s.btn_filtros} id='order' onChange={(evt) => {
                setFiltros({ key: evt.target.id, valor: evt.target.value });
              }}>
                <option >All</option>
                <option value="asc">Aa-Zz</option>
                <option value="desc">Zz-Aa</option>
              </select>
            </div>
            <div className={s.f_fuerza + " " + s.filtros}>
              <label>Fuerza</label>
              <select className={s.btn_filtros} id='order' onChange={(evt) => {
                setFiltros({ key: evt.target.id, valor: evt.target.value });
              }}>
                <option >All</option>
                <option value="asc">Más a menos</option>
                <option value="desc">Menos a más</option>
              </select>
            </div>
            <div className={s.f_tipos + " " + s.filtros}>
              <label>Tipos</label>
              <select className={s.btn_filtros} id='type' onChange={(evt) => {
                setFiltros({ key: evt.target.id, valor: evt.target.value });
              }}>
                <option value="all">All</option>
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
            pokemon.length && pokemon.map((e, i) => {
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
            disabled={totalPokemons === 1 ? true : false}
            onClick={nextPage}
            className={s.btn_page_next}
          >
            {">>"}
          </button>
        </div>
        {
          pokemon.mensaje ? <Loading mensaje={pokemon.mensaje} /> :
            <Pokemon pokemons={pokemon} pageActual={back} nextPage={next} mensaje={`${key} no encontrado`} />
        }
      </div>
    </React.Fragment>
  )
}

export default Home;