const axios = require("axios");

module.exports = {
    getTypesPokemons: async () => {
        const typesUrl = await  axios.get("https://pokeapi.co/api/v2/type")
        return typesUrl.data.results;
    }
}