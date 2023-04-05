import axios from "axios";

export const ALL_POKEMONS = "ALL_POKEMONS";
export const ALL_TYPES = "ALL_TYPES";
export const FILTER_x_TYPES = "FILTER_x_TYPES";


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

export const filtroPorTipo = (tipo) => async (dispatch) => {
    try {
        return dispatch({
            type: FILTER_x_TYPES,
            payload: tipo
        });
    } catch (error) {
        return dispatch({
            type: FILTER_x_TYPES,
            payload: {mensaje: error.message}
        });
    }
}