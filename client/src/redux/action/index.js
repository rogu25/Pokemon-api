import axios from "axios";

export const ALL_POKEMONS = "ALL_POKEMONS";
export const ALL_TYPES = "ALL_TYPES";
export const FILTROS_POKEMONS = "FILTROS_POKEMONS";
export const TODOS_LOS_FILTROS = "TODOS_LOS_FILTROS";
export const GET_NAME_POKEMON = "GET_NAME_POKEMON";
export const GET_ID_POKEMON = "GET_ID_POKEMON";
export const UPDATE_POKEMON = "UPDATE_POKEMON";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";

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

export const get_id_pokemon = (id) => async (dispatch) => {
    try {
        const getIdPokemon = await axios.get(`http://localhost:3001/api/pokemons/${id}`);
        return dispatch({
            type: GET_ID_POKEMON,
            payload: getIdPokemon.data
        });
    } catch (error) {
        return dispatch({
            type: GET_ID_POKEMON,
            payload: {mensaje: error.message}
        });
    }
}

export const update_pokemon = (id, obj) => async (dispatch) => {
    try {
        const updatePokemon = await axios.put(`http://localhost:3001/api/pokemons/${id}`, obj);
        return dispatch({
            type: UPDATE_POKEMON,
            payload: updatePokemon.data
        });
    } catch (error) {
        return dispatch({
            type: UPDATE_POKEMON,
            payload: {mensaje: error.message}
        });
    }
}

export const create_pokemon = (obj) => async (dispatch) => {
    try {
        const createPokemon = await axios.post(`http://localhost:3001/api/pokemons`, obj);
        return dispatch({
            type: CREATE_POKEMON,
            payload: createPokemon.data
        });
    } catch (error) {
        return dispatch({
            type: CREATE_POKEMON,
            payload: {mensaje: error.message}
        });
    }
}

export const delete_pokemon = (id) => async (dispatch) => {
    try {
        const deletePokemon = await axios.delete(`http://localhost:3001/api/pokemons/${id}`);
        return dispatch({
            type: DELETE_POKEMON,
            payload: deletePokemon.data
        });
    } catch (error) {
        return dispatch({
            type: DELETE_POKEMON,
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


