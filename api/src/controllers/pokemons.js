const axios = require("axios");

module.exports = {
    getPokemons: async () => {
        const pokemonsUrl = await  axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
        return pokemonsUrl.data.results;
    },
    getNamePokemon: async (name) => {
        try {
            const urlNamePokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const detalleName = {
                id: urlNamePokemon.data.id,
                nombre: urlNamePokemon.data.name,
                fuerza: urlNamePokemon.data.stats[0].base_stat,
                imagen: urlNamePokemon.data.sprites.other.home.front_default,
                types: urlNamePokemon.data.types.map((t) => { return { name: t.type.name } })
              };
            return detalleName;
        } catch (error) {
            return {mensaje: `Pokemon no encontrado ${error.message}`};
        }
    },
    getIdPokemon: async (id) => {
        const urlIdPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const detallePokeApi = {
            id: urlIdPokemon.data.id,
            nombre: urlIdPokemon.data.name,
            vida: urlIdPokemon.data.base_experience,
            fuerza: urlIdPokemon.data.stats[0].base_stat,
            defensa: urlIdPokemon.data.stats[2].base_stat,
            velocidad: urlIdPokemon.data.stats[5].base_stat,
            altura: urlIdPokemon.data.height, 
            peso: urlIdPokemon.data.weight,
            imagen: urlIdPokemon.data.sprites.other.home.front_default,
            types: urlIdPokemon.data.types.map((t) => {return  {name: t.type.name}})
        }
        return detallePokeApi;
    }
}


