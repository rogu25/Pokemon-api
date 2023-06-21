import { ALL_POKEMONS, ALL_TYPES, FILTROS_POKEMONS} from "../action";
// import { customFilter } from "../../hooks/Custom";

const initialState = {
    pokemons: [],
    tipos: [],
    pokemonsFiltrados: {origen:"all", orden: "all", tipo:"all", filtrados: [], total:0},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                pokemonsFiltrados: {origen:"all", orden:"all", tipo:"all", filtrados: action.payload, total: action.payload.length}
            }
        case ALL_TYPES:
            return {
                ...state,
                tipos: action.payload
            }
        case FILTROS_POKEMONS:
            return {
                ...state,
                pokemonsFiltrados: action.payload
            }
        default:
            return state;
    }
};

export default rootReducer;