import React, { useState } from 'react';

import s from "../css/CardDetallePokemon.module.css";
import { NavLink } from 'react-router-dom';

function CardDetallePokemon({ detalles }) {

    const { nombre, imagen, vida, fuerza, defensa, velocidad, altura, peso, types } = detalles;

    const [activo, setActivo] = useState(true);

    const onClickEdition = () => {
        setActivo(false)
    }

    const onClickGrabar = () => {
        setActivo(true)
    }

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
                    <h3>Tipos:</h3>
                    <h5 className={s.tTipos}>
                        {
                            types.length && types.map((t, index) => {
                                return (
                                    <input className={activo ? s.inputD : s.inputA} key={index} type="text" defaultValue={`${t.name}`} disabled={activo} />
                                );
                            })
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