const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db.js");
const { getPokemons } = require("../controllers/pokemons.js");
const { validatorUUIDV4 } = require("../controllers/validator.js");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {

    try {
        let urlPokemon = [];
        const urlExternal = await getPokemons();

        // urlExternal.map((d) => urlPokemon.push(d.url));

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

router.get("/name", async (req, res, next) => {

});

router.get("/:idPokemon", async (req, res, next) => {

});

router.post("/", async (req, res, next) => {

});

module.exports = router;
