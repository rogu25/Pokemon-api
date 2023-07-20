const {Router} = require('express');
const { Type } = require("../db.js");
const { getTypesPokemons } = require("../controllers/types.js");
const router  = Router();

router.get('/', async (req, res, next) => {
    try {
        const allTypesDb = await Type.findAll();
        if(!allTypesDb.length){
            const typesPokemonsApi = await getTypesPokemons();
            const allTypes = typesPokemonsApi.map((t) => {return {name: t.name}});
            await Type.bulkCreate(allTypes);
            console.log("lo que contien mi TIPOS: ")
        }
        res.json(allTypesDb)
    } catch (error) {
        next(error)
    }
});

module.exports = router;
