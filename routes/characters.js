const { default: axios } = require('axios');
const express = require('express');

const router = express.Router();
module.exports = router;

// al no haber base de datos los personajes creados se deberan guardar en este arreglo.
let newChars = [
  {
    id: 100,
    name: 'Alfonso Example',
    species: 'Human',
    gender: 'Male',
    image: ':V',
  },
];
let id = 21;

async function allChars() {
  try {
    // Observar que lo esperado (await... )está entre paréntesis antes de los métodos .data...
    let data = (await axios.get('https://rickandmortyapi.com/api/character')).data.results.map(
      char => {
        const { id, name, species, gender, image } = char;
        return { id, name, species, gender, image };
      }
    );

    return [...data, ...newChars];
  } catch (error) {
    console.error(error);
  }
}

// Traer todos los personajes que les brinda esa url, deberan traer su id, nombre, especie, genero e imagen. filtrarlos por nombre, genero y especie.

router.get('/', async (req, res) => {
  const { name, gender, species } = req.body;
  let response = await allChars();

  if (name) {
    let result = response.filter(c => c.name === name);
    result.length ? res.status(200).send(result) : res.status(400).send(name + ' not found.');
  } else if (gender) {
    let result = response.filter(c => c.gender === gender);
    result.length ? res.status(200).send(result) : res.status(400).send(name + ' not found.');
  } else if (species) {
    let result = response.filter(c => c.species === species);
    result.length ? res.status(200).send(result) : res.status(400).send(name + ' not found.');
  } else {
    res.status(400).send('Send JSON with name, gender or species, character not found.');
  }
});

//PLUS
router.get('/all', async (req, res) => {
  const { name, gender, species } = req.body;
  let response = await allChars();

  res.status(200).send(response);
});

// A traves de params, acceder al id de un personaje en particular y traer solo su informacion.

router.get('/:id', async (req, res) => {
  // notar que el id viene como texto y los personajes lo tiene como número.
  let response = (await allChars()).filter(chars => chars.id === parseInt(req.params.id));

  response ? res.status(200).send(response) : res.status(400).send('Character not found');
});

/* En el post se tendria que poder crear un personaje nuevo pasandole por body el nombre, la especie, el genero y la imagen. Habra que validar que se pase todas las propiedades por body, sino tirar un mensaje de error, y ademas, que la especie de ese nuevo personaje exista (para esto tendran que tener la ruta de species completa). Fijarse que el id ya esta definido y a medida que se van creando los personajes este debera ir aumentando. */

router.post('/', (req, res) => {
  let { name, species, gender, image } = req.body;

  if (!name || !species || !gender || !image)
    return res
      .status(400)
      .send('Not enought info, send JSON with name, species, gender and image.');

  let allSpecies = ['Human', 'Alien']; //|?| Incompleto

  if (!allSpecies.includes(species)) return res.status(400).send('Incorrect species.');

  const newChar = {
    id: id,
    name,
    species,
    gender,
    image,
  };

  newChars.push(newChar);
  id++;

  res.status(200).send('New caracter created');
});
