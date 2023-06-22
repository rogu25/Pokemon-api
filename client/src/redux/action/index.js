import axios from "axios";

export const ALL_POKEMONS = "ALL_POKEMONS";
export const ALL_TYPES = "ALL_TYPES";
export const FILTROS_POKEMONS = "FILTROS_POKEMONS";
export const TODOS_LOS_FILTROS = "TODOS_LOS_FILTROS";
export const GET_NAME_POKEMON = "GET_NAME_POKEMON";

//------------------ request pokemons ----------------

export const get_all_pokemons = () => async (dispatch) => {
    try {
        const getAllPokemons = await axios.get("http://localhost:3001/api/pokemons");
        return dispatch({
            type: ALL_POKEMONS,
            payload: getAllPokemons.data
        });
    } catch (error) {
        return dispatch({
            type: ALL_POKEMONS,
            payload: {mensaje: error.message}
        });
    }
}

export const get_name_pokemon = (name) => async (dispatch) => {
    try {
        const getNamePokemon = await axios.get(`http://localhost:3001/api/pokemons/name?nombre=${name}`);
        return dispatch({
            type: GET_NAME_POKEMON,
            payload: getNamePokemon.data
        });
    } catch (error) {
        return dispatch({
            type: GET_NAME_POKEMON,
            payload: {mensaje: error.message}
        });
    }
}

//------------------- request tipos ---------------------

export const get_all_types = () => async (dispatch) => {
    try {
        const getAllTypes = await axios.get("http://localhost:3001/api/types");
        return dispatch({
            type: ALL_TYPES,
            payload: getAllTypes.data
        });
    } catch (error) {
        return dispatch({
            type: ALL_TYPES,
            payload: {mensaje: error.message}
        });
    }
}

//------------------- request filtros ------------------------

export const filtrosPokemons = (obj) => async (dispatch) => {
    try {
        return dispatch({
            type: FILTROS_POKEMONS,
            payload: obj
        });
    } catch (error) {
        return dispatch({
            type: FILTROS_POKEMONS,
            payload: {mensaje: error.message}
        });
    }
}


