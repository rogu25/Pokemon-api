import axios from "axios";

export const ALL_POKEMONS = "ALL_POKEMONS";
export const ALL_TYPES = "ALL_TYPES";
export const FILTROS_POKEMONS = "FILTROS_POKEMONS";

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

export const filtrosPokemons = (obj) => async (dispatch) => {
    try {
        return dispatch({
            type: FILTROS_POKEMONS,
            payload: obj
        });
    } catch (error) {
        return dispatch({
            type: FILTROS_POKEMONS,
            payload: {key: error.message}
        });
    }
}