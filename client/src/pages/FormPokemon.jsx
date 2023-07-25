import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import s from "../css/FormPokemon.module.css";

import pokebola from "../img/pokebola.png";
import { get_all_types, create_pokemon } from "../redux/action/index";

function FormPokemon() {

  const dispatch = useDispatch();
  const { tipos } = useSelector((state) => state);

  const [types, setTypes] = useState([]);
  const [inputs, setInputs] = useState({
    nombre: "",
    imagen:"",
    vida: "",
    fuerza: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    tipos: []
  });

  const selecionar_tipos = (e) => {
    setTypes((prev) => [...prev, { id: Number(e.target.value), name: e.target.options[e.target.selectedIndex].text }]);
    setInputs((prev) => ({ ...prev, tipos: [...prev.tipos, Number(e.target.value)] }));
  }

  const onChangeInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const enviar_formulario = (e) => {
    e.preventDefault();
    dispatch(create_pokemon(inputs));
    console.log("me enviaste")
  }

  useEffect(() => {
    dispatch(get_all_types());
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className={s.content_form}>
        <h2>Crear nuevo Pokemon</h2>
        <form onSubmit={enviar_formulario} method="post" className={s.formulario}>
          <div className={s.content_input}>
            <div className={s.inputs_lbl}>
              <label htmlFor="">Nombre:</label>
              <input type="text" name={"nombre"} value={inputs.nombre} onChange={onChangeInputs} />
            </div>
            <div className={s.inputs_lbl}>
              <label htmlFor="">Vida:</label>
              <input type="text" name={"vida"} value={inputs.vida} onChange={onChangeInputs} />
            </div>
            <div className={s.inputs_lbl}>
              <label htmlFor="">Fuerza:</label>
              <input type="text" name={"fuerza"} value={inputs.fuerza} onChange={onChangeInputs} />
            </div>
            <div className={s.inputs_lbl}>
              <label htmlFor="">Defensa:</label>
              <input type="text" name={"defensa"} value={inputs.defensa} onChange={onChangeInputs} />
            </div>
            <div className={s.inputs_lbl}>
              <label htmlFor="">Velocidad:</label>
              <input type="text" name={"velocidad"} value={inputs.velocidad} onChange={onChangeInputs} />
            </div>
            <div className={s.inputs_lbl}>
              <label htmlFor="">Altura:</label>
              <input type="text" name={"altura"} value={inputs.altura} onChange={onChangeInputs} />
            </div>
            <div className={s.inputs_lbl}>
              <label htmlFor="">Peso:</label>
              <input type="text" name={"peso"} value={inputs.peso} onChange={onChangeInputs} />
            </div>
            <div className={s.select_types}>
              <label htmlFor="">Tipos</label>
              <select name="" id="" className={s.seleccion} onChange={selecionar_tipos}>
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
                types.length && types.map((t) => {
                  return (
                    <span key={t.id}>{t.name}</span>
                  )
                })
              }
            </div>
            <div className={s.btn_form}>
              <button type="submit">Grabar</button>
            </div>
          </div>
          <div className={s.content_img}>
            <input type="text" name='imagen' value={inputs.imagen} placeholder='Cargar imagen o pegar Url de imagen' onChange={onChangeInputs}/>
            <img className={s.load_img} src={inputs.imagen ? inputs.imagen : pokebola} alt='' />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default FormPokemon;