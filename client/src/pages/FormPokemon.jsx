import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import s from "../css/FormPokemon.module.css";

import pokebola from "../img/pokebola.png";
import { get_all_types, create_pokemon } from "../redux/action/index";

import validation from '../hooks/validator';

function FormPokemon() {

  const dispatch = useDispatch();
  const { tipos, mensaje } = useSelector((state) => state);
  const formControl = useRef();
  console.log("lo que contiene mensaje: ", mensaje)
  const [types, setTypes] = useState([]);
  const [inputs, setInputs] = useState({
    nombre: "",
    imagen: "",
    vida: 10,
    fuerza: 10,
    defensa: 10,
    velocidad: 10,
    altura: 10,
    peso: 10,
    tipos: []
  });
  const [errors, setErrors] = useState({});
  const [activar, setActivar] = useState(true);
  const [reset, setReset] = useState({});

  const selecionar_tipos = (e) => {
    setTypes((prev) => [...prev, { id: Number(e.target.value), name: e.target.options[e.target.selectedIndex].text }]);
    setInputs((prev) => ({ ...prev, tipos: [...prev.tipos, Number(e.target.value)] }));
    setErrors(validation({ ...inputs, tipos: [...inputs.tipos, Number(e.target.value)] }));
    setActivar(false);
  }

  const onChangeInputsText = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(validation({ ...inputs, [e.target.name]: e.target.value }));
    setActivar(false);
  }

  const onChangeInputsNumber = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
    setErrors(validation({ ...inputs, [e.target.name]: e.target.value }));
    setActivar(false);
  }

  const enviar_formulario = (e) => {
    e.preventDefault();
    if (Object.entries(errors).length === 0) {
      dispatch(create_pokemon(inputs));
      setInputs(reset);
      setTypes([]);
      setActivar(true);
    }
  }

  const onClickEliminar = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        tipos: prev.tipos.filter((f) => f !== Number(e.target.id))
      }
    });
    setTypes((prev) => prev.filter((f) => f.id !== Number(e.target.id)));
    setErrors(validation({ ...inputs, tipos: inputs.tipos.filter((f) => f !== Number(e.target.id)) }));
  };

  const onClickLimpiar = () => {
    setInputs(reset);
    setTypes([]);
    setActivar(true);
    setErrors(validation(inputs))
  };

  useEffect(() => {
    dispatch(get_all_types());
    setReset(inputs);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className={s.content_form}>
        <h2 className={s.titulo}>Crear nuevo Pokemon</h2>
        <form onSubmit={enviar_formulario} method="post" className={s.formulario} ref={formControl}>
          <div className={s.content_input}>
            <div className={s.inputs_lbl}>
              {
                errors.nombre && <span className={s.errors}>X</span>
              }
              <label htmlFor="">Nombre:</label>
              <input type="text" className={!errors.nombre ? s.inputs : s.inputs_errors} name={"nombre"} value={inputs.nombre} onChange={onChangeInputsText} placeholder='texto' />
            </div>
            <div className={s.inputs_lbl}>
              {
                errors.vida && <span className={s.errors}>X</span>
              }
              <label htmlFor="">Vida:</label>
              <input type="number" className={!errors.vida ? s.inputs : s.inputs_errors} name={"vida"} value={inputs.vida} onChange={onChangeInputsNumber} min={10} max={1000} />
            </div>
            <div className={s.inputs_lbl}>
              {
                errors.fuerza && <span className={s.errors}>X</span>
              }
              <label htmlFor="">Fuerza:</label>
              <input type="number" className={!errors.fuerza ? s.inputs : s.inputs_errors} name={"fuerza"} value={inputs.fuerza} onChange={onChangeInputsNumber} />
            </div>
            <div className={s.inputs_lbl}>
              {
                errors.defensa && <span className={s.errors}>X</span>
              }
              <label htmlFor="">Defensa:</label>
              <input type="number" className={!errors.defensa ? s.inputs : s.inputs_errors} name={"defensa"} value={inputs.defensa} onChange={onChangeInputsNumber} />
            </div>
            <div className={s.inputs_lbl}>
              {
                errors.velocidad && <span className={s.errors}>X</span>
              }
              <label htmlFor="">Velocidad:</label>
              <input type="number" className={!errors.velocidad ? s.inputs : s.inputs_errors} name={"velocidad"} value={inputs.velocidad} onChange={onChangeInputsNumber} />
            </div>
            <div className={s.inputs_lbl}>
              {
                errors.altura && <span className={s.errors}>X</span>
              }
              <label htmlFor="">Altura:</label>
              <input type="number" className={!errors.altura ? s.inputs : s.inputs_errors} name={"altura"} value={inputs.altura} onChange={onChangeInputsNumber} />
            </div>
            <div className={s.inputs_lbl}>
              {
                errors.peso && <span className={s.errors}>X</span>
              }
              <label htmlFor="">Peso:</label>
              <input type="number" className={!errors.peso ? s.inputs : s.inputs_errors} name={"peso"} value={inputs.peso} onChange={onChangeInputsNumber} />
            </div>
            <div className={s.select_types}>
              <h4>Tipos</h4>
              <select name="" id="" className={s.seleccion} onChange={selecionar_tipos} disabled={inputs.tipos.length > 2 && true}>
                <option>Seleccionar tipo</option>
                {
                  tipos.length && tipos.map((t) => {
                    return (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className={s.content_types}>
              {
                types.length || inputs.tipos.length ? types.map((t) => {
                  return (
                    <span key={t.id}><button type='button' id={t.id} className={s.btn_eliminar} onClick={onClickEliminar}>X</button> {t.name}</span>
                  )
                }) : <span className={s.mensaje}>{errors.tipos}</span>
              }
            </div>
            <div className={s.content_btn}>
              <button type="submit" className={s.btn_form} disabled={activar}>Grabar</button>
              <button type="button" className={s.btn_form} onClick={onClickLimpiar} disabled={!inputs.nombre.length&&true}>Limpiar</button>
              <NavLink to={"/home"}>
                <button type='button' className={s.btn_form}>Salir</button>
              </NavLink>
            </div>
            <span className={s.mensaje}>{mensaje && activar && mensaje}</span>
          </div>
          <div className={s.content_img}>
            {
              errors.imagen && <span className={s.errors}>X</span>
            }
            <input type="text" className={!errors.imagen?s.input_imagen:s.input_imagen_errors} name='imagen' value={inputs.imagen} placeholder='Cargar imagen o pegar Url de imagen' onChange={onChangeInputsText} />
            <img className={s.load_img} src={inputs.imagen ? inputs.imagen : pokebola} alt='' />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default FormPokemon;