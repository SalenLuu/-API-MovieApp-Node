const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

let movieId;

test("POST /movies should create a movie", async () => {
  const movie = {
    name: "Kill Bill",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Kill_Bill_Volume_1.png/220px-Kill_Bill_Volume_1.png",
    synopsis:
      "A former assassin, known simply as The Bride (Uma Thurman), wakes from a coma four years after her jealous ex-lover Bill (David Carradine) attempts to murder her on her wedding day. Fueled by an insatiable desire for revenge, she vows to get even with every person who contributed to the loss of her unborn child, her entire wedding party, and four years of her life. After devising a hit list, The Bride sets off on her quest, enduring unspeakable injury and unscrupulous enemies.",
    releaseYear: 2003,
  };

  const res = await request(app).post("/movies").send(movie);
  movieId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /movies should return all movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /movies/:id should update movie info", async () => {
  const movieUpdated = {
    name: "new Kill Bill",
  };
  const res = await request(app).put(`/movies/${movieId}`).send(movieUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name);
});

test("POST /movies/:id/actors should set the movie actors", async () => {
  const actor = await Actor.create({
    firstName: "Chiaki",
    lastName: "Kuriyama",
    nationality: "Japanesse",
    image:
      "https://static.wikia.nocookie.net/doblaje/images/7/7f/Full-chiaki-kuriyama-571240498.jpg/revision/latest/scale-to-width-down/672?cb=20200516124321&path-prefix=es",
    birthday: "1984-10-10",
  });

  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);

  await actor.destroy();

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors should set movie directors", async () => {
  const director = await Director.create({
    firstName: "Quentin",
    lastName: "Tarantino",
    nationality: "American",
    image:
      "https://resizing.flixster.com/oRX8YU-Oj8U7WDKJarl8RnxU1zk=/218x280/v2/https://flxt.tmsimg.com/assets/52431_v9_bb.jpg",
    birthday: "1963-03-26",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
  await director.destroy();

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres should set movie genres", async () => {
  const genre = await Genre.create({ name: "Action" });

  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
  await genre.destroy();

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE /movies/:id should delete a specific movie", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});
