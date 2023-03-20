const axios = require("axios");

module.exports = {
    getPokemons: async () => {
        const pokemonsUrl = await  axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
        return pokemonsUrl.data.results;
    },
    getNamePokemon: async (name) => {
        let findPokemon = [];
        try {
            const urlNamePokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            findPokemon.push(urlNamePokemon.data);
            return findPokemon;
        } catch (error) {
            return findPokemon;
        }
    },
    getIdPokemon: async (id) => {
        const urlIdPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return urlIdPokemon.data;
    }
}


