const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db.js");
const { getPokemons,getNamePokemon } = require("../controllers/pokemons.js");
const { validatorUUIDV4 } = require("../controllers/validator.js");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {

    try {
        
        const urlExternal = await getPokemons();

        const allPokemons = await Promise.all(
            urlExternal.map((data) => axios.get(data.url))
        );

        const getPokemonAPI = allPokemons.map((r) => {
            return {
                id: r.data.id,
                name: r.data.name,
                attack: r.data.stats[1].base_stat,
                img: r.data.sprites.other.home.front_default,
                types: r.data.types.map((t) => { return { name: t.type.name } })
            };
        });

        const getPokemonDB = await Pokemon.findAll({
          attributes: ["id", "name", "img", "attack"],
          include: {
            model: Type,
            through: {
              attributes: []
            },
            attributes: ["name"] 
          }
        });

        const allPokemonsApiandDb = [...getPokemonDB,...getPokemonAPI]; 
        res.json(allPokemonsApiandDb);

    } catch (error) {
        next(error);
    }

});

router.get("/name/:name", async (req, res, next) => {
    try {
      const {name} = req.params;
      const namePokemon = await getNamePokemon(name);
      return res.json(namePokemon);
    } catch (error) {
      next("pokemon no encontrado");
    }
});

router.get("/:idPokemon", async (req, res, next) => {

});

router.post("/", async (req, res, next) => {

});

module.exports = router;
