const {Router} = require('express');
const { Type } = require("../db.js");
const { getTypesPokemons } = require("../controllers/types.js");
const router  = Router();

router.get('/', async (req, res, next) => {
    try {
        const typesPokemonsApi = await getTypesPokemons();
        const allTypes = typesPokemonsApi.map((t) => {return {name: t.name}});
        const allTypesDb = await Type.findAll();
        !allTypesDb.length && await Type.bulkCreate(allTypes);
        res.json(allTypesDb)
    } catch (error) {
        next(error)
    }
});

module.exports = router;
