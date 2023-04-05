import React from 'react';
import s from "../css/Home.module.css";
import { useDispatch} from 'react-redux';
import { filtroPorTipo } from '../redux/action';

function Filtros({tipos}) {

    const dispatch = useDispatch();
    
    const filtrarTipos = (evt) => {
        dispatch(filtroPorTipo(evt.target.value))
    }

    return (
        <div className={s.contenedor}>
            <h4>Filtrados</h4>
            <div className={s.contenedorFiltros}>
                <button>Aa-Zz</button>
                <select onChange={filtrarTipos}>
                    <option value="">Tipos</option>
                    {   
                        tipos.length && tipos.map((t) => {
                            return <option key={t.id} value={t.name}>{t.name}</option>
                        })
                    } 
                </select>
                <button>Externa/base de datos/all</button>
                <button>Fuerza</button>
            </div>
        </div>
    )
}

export default Filtros;