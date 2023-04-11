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
        <div className={s.content_filtros}>
            <h4 className={s.titulo_filtros}>Filtrados</h4>
            <div className={""}>
                <button className={s.btn_filtros}>Aa-Zz</button>
                <select className={s.btn_filtros} onChange={filtrarTipos}>
                    <option value="">Tipos</option>
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
    )
}

export default Filtros;