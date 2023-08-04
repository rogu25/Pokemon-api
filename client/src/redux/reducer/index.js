import { ALL_POKEMONS, ALL_TYPES, FILTROS_POKEMONS, GET_NAME_POKEMON, GET_ID_POKEMON, UPDATE_POKEMON, DELETE_POKEMON, CREATE_POKEMON } from "../action";

const initialState = {
    pokemons: [],
    mensaje: "",
    tipos: [],
    pokemonsFiltrados: { origen: "all", orden: "all", tipo: "all", filtrados: [], total: 0 },
    detallePokemon: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload.data || action.payload,
                pokemonsFiltrados: { origen: "all", orden: "all", tipo: "all", filtrados: action.payload.data || action.payload, total: action.payload.length },
                mensaje: action.payload.mensaje,
                detallePokemon: {}
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
                pokemonsFiltrados: { origen: "", orden: "all", tipo: "all", filtrados: action.payload.nombre ? [action.payload] : [], total: action.payload.length },
                mensaje: action.payload.mensaje
            }

        case GET_ID_POKEMON:
            return {
                ...state,
                detallePokemon: action.payload
            }

        case CREATE_POKEMON:
            return {
                ...state,
                mensaje: action.payload.mensaje
            }

        case UPDATE_POKEMON:
            return {
                ...state,
                mensaje: action.payload.mensaje
            }

        case DELETE_POKEMON:
            return {
                ...state,
                mensaje: action.payload.mensaje
            }


        default:
            return state;
    }
};

export default rootReducer;