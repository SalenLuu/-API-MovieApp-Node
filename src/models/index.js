const Movie = require("./Movie");
const Genre = require("./Genre");
const Director = require("./Director");
const Actor = require("./Actor");

Movie.belongsToMany(Actor, { through: "MoviesActors" });
Actor.belongsToMany(Movie, { through: "MoviesActors" });

Movie.belongsToMany(Genre, { through: "MoviesGenres" });
Genre.belongsToMany(Movie, { through: "MoviesGenres" });

Movie.belongsToMany(Director, { through: "MoviesDirectors" });
Director.belongsToMany(Movie, { through: "MoviesDirectors" });
