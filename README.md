# `Repaso M3`

<p align="left">
  <img background="none" height="200" src="./rym.png" />
</p>

## `npm install`

importante instalar las dependecias puestas ya en el package.json para su desarrollo y funcionamiento.S

### `npm start`

Realizar este comando sobre la carpeta contenedora para correr el back dentro del server 3001.
para ir probando los gets pueden hacerlo desde el browser, pero los post tendran que probarlos con [Postman](https://www.postman.com/downloads/).

## `Laburo en el Back`

Van a tener que crear las rutas para mostrar los characters y las species. Solo usando https://rickandmortyapi.com/api/character (en la carpeta models tienen un ejemplo de como les viene la info de la api) tendran que:

### `/characters`

En esta ruta haran dos gets y un post. Tendran que traer todos los personajes que les brinda esa url, deberan traer su id, nombre, especie, genero e imagen. filtrarlos por nombre, genero y especie.

En el post se tendria que poder crear un personaje nuevo pasandole por body el nombre, la especie, el genero y la imagen. Habra que validar que se pase todas las propiedades por body, sino tirar un mensaje de error, y ademas, que la especie de ese nuevo personaje exista (para esto tendran que tener la ruta de species completa). Fijarse que el id ya esta definido y a medida que se van creando los personajes este debera ir aumentando.

Y por ultimo tendran que, a traves de params, acceder al id de un personaje en particular y traer solo su informacion.

### `/species`

En esta ruta deberan traer solo las especies, sin repetirse, de los personajes que arroja la url y las creadas.

Tambien deberian poder crear especies (mediante un post) para poder, si quieren, asignarselas a nuevos personajes que vayan creando. Se deberia poder crear mas de una especie a la vez por ejemplo:

{
  "species": "Humanoid"
}

Deberia agreagar "Humanoid" a las especies creadas.

{
  "species": "Humanoid, Creature"
}

Deberia agregar "Humanoid" y "Creature" a las especies creadas.