const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db.js");
// const {getPokemons} = require("../controllers/pokemons.js");
// const { getTypes} = require("../controllers/types.js");
const { validatorUUIDV4 } = require("../controllers/validator.js");
const { Op } =  require("sequelize");

router.get("/", async (req, res, next) => {

    try {
        const getPokemonsAll = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40");
        console.log(getPokemonsAll.data)
        res.send(getPokemonsAll.data);
    } catch (error) {
        res.send(error);
    }
 
});

router.get("/name", async (req, res, next) => {
  
});

router.get("/:idPokemon", async (req, res, next) => {
 
});

router.post("/", async (req, res, next) => {
  
});

module.exports = router;
