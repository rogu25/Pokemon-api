const axios = require("axios");

module.exports = {
    getPokemons: async () => {
        const pokemonsUrl = await  axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
        return pokemonsUrl.data.results;
    },
    getNamePokemon: async (name) => {
        const urlNamePokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return urlNamePokemon.data;
    },
    getIdPokemon: async (id) => {
        const urlIdPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return urlIdPokemon.data;
    }
}


