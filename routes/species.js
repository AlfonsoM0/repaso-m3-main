const { default: axios } = require('axios');
const express = require('express');

const router = express.Router();
module.exports = router;

// al no haber base de datos las especies creadas se deberan guardar en este arreglo
let newSpecs = [];

// let oldSpecs = [];

//En esta ruta deberan traer solo las especies, sin repetirse, de los personajes que arroja la url y las creadas.

async function allSpecies() {
  let oldSpecs = (await axios.get('https://rickandmortyapi.com/api/character')).data.results.map(
    char => char.species
  );
  let allSpecies = [...new Set([...oldSpecs, ...newSpecs])];
  return allSpecies;
}

router.get('/', async (req, res) => {
  let allSpecs = await allSpecies();
  res.status(200).send(allSpecs);
});

router.post('/', (req, res) => {
  const { species } = req.body;

  if (species.includes(',')) species = species.split(', ');

  if (typeof species === 'string') {
    newSpecs.push(species);
  } else {
    newSpecs = [...newSpecs, ...species];
  }

  res.status(200).send('Especies added');
});
