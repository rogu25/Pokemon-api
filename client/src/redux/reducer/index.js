import { ALL_POKEMONS, ALL_TYPES, FILTROS_POKEMONS } from "../action";
// import { customFilter } from "../../hooks/Custom";

const initialState = {
    pokemons: [],
    tipos: [],
    pokemonsFiltrados: { key: "", pokemon: [] },
    filtroTemporal: [],
    filtroApi: [],
    filtroDb: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                pokemonsFiltrados: {key:"all", pokemon: action.payload}
            }
        case ALL_TYPES:
            return {
                ...state,
                tipos: action.payload
            }
        case FILTROS_POKEMONS:
            if (action.payload.key === "type") {
                let filtros = state.pokemons.filter((f) => {
                    const tipos = f.types.find((t) => t.name === action.payload.valor);
                    return tipos;
                });

                if (state.filtroApi.length) {
                    console.log("filtros de la api")
                }
                
                if (state.filtroDb.length) {
                    console.log("filtros de la DB")
                }

                if (filtros.length) {
                    return {
                        ...state,
                        pokemonsFiltrados: { key: action.payload.valor, pokemon: filtros }
                    }
                } else {
                    return {
                        ...state,
                        pokemonsFiltrados: { key: "", pokemon: [] }
                    }
                }
            }
            if (action.payload.key === "order") {
                if (action.payload.valor === "asc") {
                    return {
                        ...state,
                        pokemonsFiltrados: { key: action.payload.valor, pokemon: state.pokemonsFiltrados.pokemon.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)) }
                    }
                }
                if (action.payload.valor === "desc") {
                    return {
                        ...state,
                        pokemonsFiltrados: { key: action.payload.valor, pokemon: state.pokemonsFiltrados.pokemon.sort((b, a) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)) }
                    }
                }
                return {
                    ...state,
                    pokemonsFiltrados: state.pokemonsFiltrados
                }
            }
            if (action.payload.key === "existencia") {
                if (action.payload.valor === "db") {
                    let db = state.pokemonsFiltrados.pokemon.filter((f) => f.id.length === 36);
                    return {
                        ...state,
                        pokemonsFiltrados: {
                            key: action.payload.valor, pokemon: db
                        },
                        filtroDb: db
                    }
                }
                if (action.payload.valor === "api") {
                    let api = state.pokemonsFiltrados.pokemon.filter((f) => f.id.length !== 36);
                    return {
                        ...state,
                        pokemonsFiltrados: {
                            key: action.payload.valor, pokemon: api
                        },
                        filtroApi: api
                    }
                }
                return {
                    ...state,
                    pokemonsFiltrados: state.pokemonsFiltrados
                }
            }
            if (action.payload.key === "power") {
                console.log("poder ")
            }
            break;
        default:
            return state;
    }
};

export default rootReducer;