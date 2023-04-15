import { ALL_POKEMONS, ALL_TYPES, FILTER_X_ORDEN, FILTER_X_TYPES } from "../action";

const initialState = {
    pokemons: [],
    tipos: [],
    filtrosPokemons: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                filtrosPokemons: action.payload
            }
        case ALL_TYPES:
            return {
                ...state,
                tipos: action.payload
            }
        case FILTER_X_TYPES:
            let allPokemons = state.pokemons;
            let filtroTipos = state.pokemons.filter((f) => {
                const tipos = f.types.find((t) => t.name === action.payload);
                return tipos;
            })
            if (action.payload === "all") {
                filtroTipos = allPokemons
            }
            return {
                ...state,
                filtrosPokemons: filtroTipos.length ? filtroTipos : { mensaje: `Tipo de pokemons ${action.payload} no encontrado` }
            }
        case FILTER_X_ORDEN:
            if (action.payload === "asc") {
                console.log("almenos entre: ", action.payload)
                return {
                    ...state,
                    filtrosPokemons: state.pokemons.sort((a, b) => {
                        if (a.nombre > b.nombre) {
                            return 1;
                        }
                        if (a.nombre < b.nombre) {
                            return -1;
                        }
                        return 0;
                    })
                }
            }
            if (action.payload === "desc") {
                console.log("almenos entre: ", action.payload)
                return {
                    ...state,
                    filtrosPokemons: state.pokemons.reverse()
                }
            }
            return {
                ...state,
                filtrosPokemons: state.pokemons
            }
            
        default:
            return state;
    }
};

export default rootReducer;