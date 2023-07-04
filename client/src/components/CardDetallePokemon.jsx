import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { get_all_types } from "../redux/action/index";
import s from "../css/CardDetallePokemon.module.css";

function CardDetallePokemon({ detalles }) {

    const { id, nombre, imagen, vida, fuerza, defensa, velocidad, altura, peso, types } = detalles;

    const { tipos } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [activo, setActivo] = useState(true);

    const onClickEdition = () => {
        if (id.length !== 36) return alert("no puedes editar la api de Pokemon");
        setActivo(false);
    }

    const onClickGrabar = () => {
        setActivo(true);
    }

    useEffect(() => {
        dispatch(get_all_types());
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <div className={s.content_detalle}>
                <div className={s.card_detalle}>
                    <h2 className={s.tNombre}>{nombre}</h2>
                    <img src={imagen} alt="" className={s.img} />
                    <div className={s.detalles}>
                        <div className={s.descripcion}>
                            <label className={s.labelT}>{"Vida-->"}</label>
                            <input className={activo ? s.inputD : s.inputA} type="text" defaultValue={vida} disabled={activo} />
                        </div>
                        <div className={s.descripcion}>
                            <label className={s.labelT}>{"Fuerza-->"}</label>
                            <input className={activo ? s.inputD : s.inputA} type="text" defaultValue={fuerza} disabled={activo} />
                        </div>
                        <div className={s.descripcion}>
                            <label className={s.labelT}>{"Defensa-->"}</label>
                            <input className={activo ? s.inputD : s.inputA} type="text" defaultValue={defensa} disabled={activo} />
                        </div>
                        <div className={s.descripcion}>
                            <label className={s.labelT}>{"Velocidad-->"}</label>
                            <input className={activo ? s.inputD : s.inputA} type="text" defaultValue={velocidad} disabled={activo} />

                        </div>
                        <div className={s.descripcion}>
                            <label className={s.labelT}>{"Altura-->"}</label>
                            <input className={activo ? s.inputD : s.inputA} type="text" defaultValue={altura} disabled={activo} />

                        </div>
                        <div className={s.descripcion}>
                            <label className={s.labelT}>{"Peso-->"}</label>
                            <input className={activo ? s.inputD : s.inputA} type="text" defaultValue={peso} disabled={activo} />
                        </div>
                    </div>
                    {
                        activo ? <h4>Tipos</h4> : <select className={s.select_tipos} id='tipo'>
                            <option>Tipos</option>
                            {
                                tipos.length && tipos.map((t) => {
                                    return <option key={t.id} value={t.name}>{t.name}</option>
                                })
                            }
                        </select>
                    }
                    <h5 className={s.tTipos}>
                        {
                            types.length && types.map((t) =>
                                <label key={t.name} className={s.inputD}>{t.name} </label>
                            )
                        }
                    </h5>
                    <div className={s.content_btn}>
                        <button className={s.btn_edicion} onClick={onClickEdition}>Editar</button>
                        <button className={s.btn_edicion} onClick={onClickGrabar}>Grabar</button>
                        <button className={s.btn_edicion}>
                            <NavLink to={"/home"} className={s.back}>
                                Back
                            </NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CardDetallePokemon