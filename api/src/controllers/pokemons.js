const axios = require("axios");

module.exports = {
    getPokemons: async () => {
        const pokemonsUrl = await  axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
        return pokemonsUrl.data.results;
    }
}


