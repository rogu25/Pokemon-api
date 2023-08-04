import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { get_all_types, update_pokemon, delete_pokemon } from "../redux/action/index";
import s from "../css/CardDetallePokemon.module.css";

import validation from '../hooks/validator';

function CardDetallePokemon() {

    const { detallePokemon, tipos, mensaje } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { id, nombre, imagen, vida, fuerza, defensa, velocidad, altura, peso, types } = detallePokemon;

    const [activo, setActivo] = useState(true);
    const [pokemons, setPokemons] = useState({ nombre, imagen, vida, fuerza, defensa, velocidad, altura, peso, tipos: [] });
    const [nameTypes, setNameTypes] = useState(types);
    const [errors, setErrors] = useState({});

    const onChangeInput = (e) => {
        setPokemons((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(validation({ ...pokemons, [e.target.name]: e.target.value }));
    };

    const onChangeOptionTypes = (e) => {
        const codeRepeat = pokemons.tipos.find((c) => c === Number(e.target.value));

        if (!codeRepeat) {
            setPokemons((prev) => {
                return {
                    ...prev,
                    tipos: [...prev.tipos, Number(e.target.value)]
                }
            });
            setNameTypes((prev) => [...prev, { "id": Number(e.target.value), "name": e.target.options[e.target.selectedIndex].text }]);

            setErrors(validation({ ...pokemons, tipos: [...pokemons.tipos, e.target.value] }));

        }
    };

    const onClickEdition = () => {
        if (id.length !== 36) return alert("no puedes editar la api de Pokemon");

        if (!pokemons.tipos.length) {
            const filterTipos = tipos.filter((f) => {
                const tipos = types.find((t) => t.name === f.name);
                return tipos;
            });

            setPokemons((prev) => {
                return {
                    ...prev,
                    tipos: filterTipos.map((f) => f.id)
                }
            });

            setNameTypes(filterTipos);

            setErrors(validation({ ...pokemons, tipos: filterTipos.map((f) => f.id) }));
        }

        setActivo(false);
    }

    const onClickDeleteTypes = (e) => {
        setPokemons((prev) => {
            return {
                ...prev,
                tipos: prev.tipos.filter((f) => f !== Number(e.target.id))
            }
        });
        setNameTypes((prev) => prev.filter((f) => f.name !== e.target.name));
        setErrors(validation({ ...pokemons, tipos: pokemons.tipos.filter((f) => f !== Number(e.target.id)) }));
    }

    const onClickDeletePokemon = (e) => {
        if(window.confirm("Seguro que deseas eliminar este pokemon") === true){
            dispatch(delete_pokemon(id));
            window.location.replace("/home");
        }
    }

    const onClickGrabar = () => {
        if (Object.entries(errors).length === 0) {
            dispatch(update_pokemon(id, pokemons));
            setActivo(true);
        }
    }

    useEffect(() => {
        dispatch(get_all_types());
        //  eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <div className={s.content_detalle}>
                {
                    <div className={s.card_detalle}>
                        <div className={s.content_tooltip}>
                            <button className={s.btn_eliminar} onClick={onClickDeletePokemon}>X</button>
                            <span className={s.tooltip}>Eliminar Pokemon</span>
                        </div>
                        <div className={s.tNombre}>
                            <input name={"nombre"} id={s.img_input} className={activo ? s.inputD : s.inputA} type="text" value={pokemons.nombre} placeholder='Nombre del pokemon' disabled={activo} onChange={onChangeInput} />
                        </div>
                        <input name={"imagen"} id={s.img_input} className={activo ? s.input_custom : s.inputA} value={pokemons.imagen} type="text" placeholder='Direccion de imagen...' disabled={activo} onChange={onChangeInput} />
                        <img src={imagen} alt="" className={s.img} />
                        <div className={s.detalles}>
                            <div className={s.descripcion}>
                                <label className={s.labelT}>{"Vida-->"}</label>
                                <input name={"vida"} className={activo ? s.inputD : s.inputA} type="text" value={pokemons.vida} disabled={activo} onChange={onChangeInput} />
                                <span className={errors.vida ? s.input_errors_a : s.input_errors_d}>{errors.vida}</span>
                            </div>
                            <div className={s.descripcion}>
                                <label className={s.labelT}>{"Fuerza-->"}</label>
                                <input name={"fuerza"} className={activo ? s.inputD : s.inputA} type="text" value={pokemons.fuerza} disabled={activo} onChange={onChangeInput} />
                                <span className={errors.fuerza ? s.input_errors_a : s.input_errors_d}>{errors.fuerza}</span>
                            </div>
                            <div className={s.descripcion}>
                                <label className={s.labelT}>{"Defensa-->"}</label>
                                <input name={"defensa"} className={activo ? s.inputD : s.inputA} type="text" value={pokemons.defensa} disabled={activo} onChange={onChangeInput} />
                                <span className={errors.defensa ? s.input_errors_a : s.input_errors_d}>{errors.defensa}</span>
                            </div>
                            <div className={s.descripcion}>
                                <label className={s.labelT}>{"Velocidad-->"}</label>
                                <input name={"velocidad"} className={activo ? s.inputD : s.inputA} type="text" value={pokemons.velocidad} disabled={activo} onChange={onChangeInput} />
                                <span className={errors.velocidad ? s.input_errors_a : s.input_errors_d}>{errors.velocidad}</span>
                            </div>
                            <div className={s.descripcion}>
                                <label className={s.labelT}>{"Altura-->"}</label>
                                <input name={"altura"} className={activo ? s.inputD : s.inputA} type="text" value={pokemons.altura} disabled={activo} onChange={onChangeInput} />
                                <span className={errors.altura ? s.input_errors_a : s.input_errors_d}>{errors.altura}</span>
                            </div>
                            <div className={s.descripcion}>
                                <label className={s.labelT}>{"Peso-->"}</label>
                                <input name={"peso"} className={activo ? s.inputD : s.inputA} type="text" value={pokemons.peso} disabled={activo} onChange={onChangeInput} />
                                <span className={errors.peso ? s.input_errors_a : s.input_errors_d}>{errors.peso}</span>
                            </div>
                        </div>
                        {
                            activo ? <h4>Tipos</h4> : <select className={s.select_tipos} onChange={onChangeOptionTypes} disabled={pokemons.tipos.length > 2 && true}>
                                <option>Tipos</option>
                                {
                                    tipos.length && tipos.map((t) => {
                                        return <option key={t.id} value={t.id}>{t.name}</option>
                                    })
                                }
                            </select>
                        }
                        <h5 className={s.tTipos}>
                            {
                                nameTypes.length && nameTypes.map((t, index) =>
                                    <label key={index} className={s.inputD}><button
                                        id={t.id}
                                        name={t.name}
                                        className={activo ? s.btn_types_a : s.btn_types}
                                        onClick={onClickDeleteTypes}
                                    >X</button>{t.name} | </label>
                                )
                            }
                            <span className={errors.tipos ? s.input_errors_a : s.input_errors_d}>{errors.tipos}</span>
                        </h5>
                        <div className={s.content_btn}>
                            <button className={s.btn_edicion} onClick={onClickEdition}>Editar</button>
                            <button className={s.btn_edicion} disabled={activo} onClick={onClickGrabar}>Grabar</button>
                            <button className={s.btn_edicion}>
                                <NavLink to={"/home"} className={s.back}>
                                    Back
                                </NavLink>
                            </button>
                        </div>
                        {
                            mensaje && activo && <span className={s.mensaje}>{mensaje}</span>
                        }
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default CardDetallePokemon