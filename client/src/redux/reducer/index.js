import {ALL_POKEMONS} from "../action";

const initialState = {
    pokemons: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        default: 
            return state;    
    }
};

export default rootReducer;