import { ALL_POKEMONS, ALL_TYPES, FILTROS_POKEMONS, GET_NAME_POKEMON} from "../action";

const initialState = {
    pokemons: [],
    mensaje: {},
    tipos: [],
    pokemonsFiltrados: {origen:"all", orden: "all", tipo:"all", filtrados: [], total:0},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                pokemonsFiltrados: {origen:"all", orden:"all", tipo:"all", filtrados: action.payload, total: action.payload.length},
                mensaje: action.payload.mensaje
                
            }
        case ALL_TYPES:
            return {
                ...state,
                tipos: action.payload,
                mensaje: action.payload.mensaje
            }
        case FILTROS_POKEMONS:
            return {
                ...state,
                pokemonsFiltrados: action.payload,
                mensaje: action.payload.mensaje
            }
        case GET_NAME_POKEMON:
            return {
                ...state,
                pokemonsFiltrados: {origen:"",orden:"all",tipo:"all", filtrados: action.payload.nombre?[action.payload]:[], total: action.payload.length},
                mensaje: action.payload.mensaje
            }    
            
        default:
            return state;
    }
};

export default rootReducer;