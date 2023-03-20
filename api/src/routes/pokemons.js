const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db.js");
const { getPokemons, getNamePokemon, getIdPokemon } = require("../controllers/pokemons.js");
const { validatorUUIDV4 } = require("../controllers/validator.js");
const { Op, NUMBER } = require("sequelize");

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
        img: r.data.sprites.other.home.front_default,
        types: r.data.types.map((t) => { return { name: t.type.name } })
      };
    });

    const getPokemonDB = await Pokemon.findAll({
      attributes: ["id", "name", "img"],
      include: {
        model: Type,
        through: {
          attributes: []
        },
        attributes: ["name"]
      }
    });

    const allPokemonsApiandDb = [...getPokemonDB, ...getPokemonAPI];
    res.json(allPokemonsApiandDb);

  } catch (error) {
    next(error);
  }

});

router.get("/name/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const verifyName = Number(name);
    if (! isNaN(verifyName)) {
      return res.json("Ingrese un nombre valido")
    } else {
      const getNamePokemonApi = await getNamePokemon(name);
      const namePokemonApi = getNamePokemonApi.map((r) => {
        return {
          id: r.id,
          name: r.name,
          img: r.sprites.other.home.front_default,
          types: r.types.map((t) => { return { name: t.type.name } })
        };
      });
      const namePokemonDb = await Pokemon.findOne({
        where: {
          name: name
        },
        attributes: ["id", "name", "img"],
        include: {
          model: Type,
          through: {
            attributes: []
          },
          attributes: ["name"]
        }
      });
      return namePokemonApi.length ? res.json(namePokemonApi) : res.json(namePokemonDb)
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let idNumber = Number(id);
    if (!isNaN(idNumber)) {
      const idPokemon = await getIdPokemon(idNumber);
      res.json(idPokemon);
    } else {
      res.json("Not a Number!!!");
    }
  } catch (error) {
    next("Id no valido")
  }
});

router.post("/", async (req, res, next) => {
    const {nombre, vida, fuerza, defensa, velocidad, altura, peso, imagen, tipos} = req.body;
    const addPokemon = await Pokemon.create({
      nombre, vida, fuerza, defensa, velocidad, altura, peso, imagen
    });
    await addPokemon.addTypes(tipos);
    res.json("correcto: ")
});

module.exports = router;
