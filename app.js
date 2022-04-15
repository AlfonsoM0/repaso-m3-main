const express = require('express');
const server = express();

//|> Rutas importadas
// Router con server.use('ruta', importación del JS con las rutas)

const characters = require('./routes/characters.js');
const species = require('./routes/species.js');

//|> Middlewares
server.use(express.json()); // middleware para arreglar "req.body = undefined".
//Rutas
server.use('/characters', characters);
server.use('/species', species);

server.listen(3000, error => {
  if (error) console.error(error); //|+| Clg.Error añadido

  console.log('<>----------------------ONLINE on port 3000----------------------<>');
});

//|+|-------------------------------------------

//|+| testing GET
server.get('/', (req, res) => {
  res.send('Server online');
});

//|+| testing POST
server.post('/personal_message', (req, res) => {
  const { name, verb } = req.body;
  res.send(`${name} is ${verb}...`);
});

//|+|------------------------------------------
