const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db.js");
const { getPokemons, getNamePokemon, getIdPokemon } = require("../controllers/pokemons.js");
const { validatorUUIDV4 } = require("../controllers/validator.js");
// const { Op, NUMBER, and } = require("sequelize");

router.get("/", async (req, res, next) => {

  try {

    const urlExternal = await getPokemons();

    const allPokemons = await Promise.all(
      urlExternal.map((data) => axios.get(data.url))
    );

    const getPokemonAPI = allPokemons.map((r) => {
      return {
        id: r.data.id,
        nombre: r.data.name,
        fuerza: r.data.stats[0].base_stat,
        imagen: r.data.sprites.other.home.front_default,
        types: r.data.types.map((t) => { return {name: t.type.name} })
      };
    });
    const getPokemonDB = await Pokemon.findAll({
      attributes: ["id", "nombre", "fuerza", "imagen"],
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
    const getPokemonDB = await Pokemon.findAll({
      attributes: ["id", "nombre", "fuerza", "imagen"],
      include: {
        model: Type,
        through: {
          attributes: []
        },
        attributes: ["name"]
      }
    });
    if(getPokemonDB.length){
      res.json({mensaje: `${error.hostname} ${error.code}`, data: getPokemonDB});
    }else{
      res.json({mensaje: `${error.hostname} ${error.code}  ó base de datos vacia`});
    }
  }

});

router.get("/name", async (req, res, next) => {
  try {
    const { nombre } = req.query;
    let numero = Number(nombre);
    if (!isNaN(numero)) return res.json({ mensaje: "nombre no valido" })
    if (nombre) {
      const namePokemonDb = await Pokemon.findOne({
        where: {
          nombre: nombre
        },
        attributes: ["id", "nombre", "fuerza", "imagen"],
        include: {
          model: Type,
          through: {
            attributes: []
          },
          attributes: ["name"]
        }
      });
      const namePokemonApi = await getNamePokemon(nombre);

      if (namePokemonDb) return res.json(namePokemonDb)
      if (namePokemonApi) return res.json(namePokemonApi)
    }
  } catch (error) {
    res.json({ mensaje: `No se encontro al pokemon ${error}` })
  }
});

router.get("/:id", async (req, res, next) => {
  try {

    const { id } = req.params;
    
    if(Number(id) || id.length === 36){
      if (validatorUUIDV4(id)) {
        const findIdDb = await Pokemon.findOne({
          where: { id: id },
          include: {
            model: Type,
            through: {
              attributes: []
            },
            attributes: ["name"]
          }
        });
        res.json(findIdDb);
      } else {
        const findIdApi = await getIdPokemon(id);
        res.json(findIdApi)
      }
    }else{
      res.json({ mensaje: `Ingrese un Id correcto...!!!` })
    }

  } catch (error) {
    res.json({ mensaje: `Id pokemon no encontrado: ${error}` })
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { nombre, vida, fuerza, defensa, velocidad, altura, peso, imagen, tipos } = req.body;
    const addPokemon = await Pokemon.create({
      nombre, vida, fuerza, defensa, velocidad, altura, peso, imagen
    });
    await addPokemon.addTypes(tipos);
    res.json({ mensaje: "Pokemon creado correctamente...!!!" })
  } catch (error) {
    res.json({ mensaje: `error al crear el pokemon ${error}` })
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if(!validatorUUIDV4(id)) return res.json({ mensaje: `No es un id Valido` })
    const { nombre, vida, fuerza, defensa, velocidad, altura, peso, imagen, tipos } = req.body;
    
    if(!tipos.length) return res.json({mensaje:"Tipos de pokemons Invalidos"})
    
    await Pokemon.update({
      nombre, vida, fuerza, defensa, velocidad, altura, peso, imagen
    }, {
      where : {id}
    }
    );
    const findPokemon = await Pokemon.findOne({
      where: {id}
    })
    await findPokemon.setTypes(tipos);
    
    return res.json({ mensaje: "Pokemon Actualizado correctamente...!!!" })

  } catch (error) {
    return res.json({ mensaje: `error al Actualizar el pokemon ${error}` })
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const eliminarPoke = await Pokemon.destroy({
      where: {id: id}
    });
    return eliminarPoke === 1 ? res.json({ mensaje: "Pokemon Eliminado correctamente...!!!" }) : res.json({ mensaje: "Se eliminó" })
  } catch (error) {
    return res.json({ mensaje: `error al Eliminar el pokemon ${error}` })
  }
});

module.exports = router;
