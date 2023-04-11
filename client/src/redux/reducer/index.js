import { ALL_POKEMONS, ALL_TYPES, FILTER_X_TYPES } from "../action";

const initialState = {
    pokemons: [],
    tipos: [],
    filtroTipo: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        case ALL_TYPES:
            return {
                ...state,
                tipos: action.payload
            }
        case FILTER_X_TYPES:
            const filtroTipos = state.pokemons.filter((f) => {
                const tipos = f.types.find((t) => t.name === action.payload);
                return tipos; 
            })
            return {
                ...state,
                filtroTipo: action.payload ==="all"? []:filtroTipos
            }
        default:
            return state;
    }
};

export default rootReducer;