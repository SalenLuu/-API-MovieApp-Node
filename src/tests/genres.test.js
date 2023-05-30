const request = require("supertest");
const app = require("../app");
const { expectCt } = require("helmet");

let genreId;

test("POST /genres should create a movie genre", async () => {
  const genre = {
    name: "Action",
  };
  const res = await request(app).post("/genres").send(genre);
  genreId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /genres should return all genres", async () => {
  const res = await request(app).get("/genres");

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /genres/:id should updated genre info ", async () => {
  const genreUpdated = {
    name: "Horror",
  };
  const res = await request(app).put(`/genres/${genreId}`).send(genreUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name);
});

test("DELETE /genres/:id hould delete a specific genre", async () => {
  const res = await request(app).delete(`/genres/${genreId}`);
  expect(res.status).toBe(204);
});
