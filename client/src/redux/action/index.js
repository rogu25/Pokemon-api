import axios from "axios";

export const ALL_POKEMONS = "ALL_POKEMONS";


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