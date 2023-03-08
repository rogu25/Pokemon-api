const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routePokemons = require('./pokemons.js')
const routeTypes  = require('./types.js');
const router = Router();  

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', routePokemons);
router.use('/types', routeTypes);

module.exports = router;
