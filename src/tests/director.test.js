const request = require("supertest");
const app = require("../app");
const { expectCt } = require("helmet");

let directorId;

test("post /directors should create a director", async () => {
  const director = {
    firstName: "Quentin",
    lastName: "Tarantino",
    nationality: "American",
    image:
      "https://resizing.flixster.com/oRX8YU-Oj8U7WDKJarl8RnxU1zk=/218x280/v2/https://flxt.tmsimg.com/assets/52431_v9_bb.jpg",
    birthday: "1963-03-26",
  };

  const res = await request(app).post("/directors").send(director);
  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /directors should return all directors", async () => {
  const res = await request(app).get("/directors");

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /directors should update a selected director", async () => {
  const directorUpdated = {
    firstName: "Quentin new",
  };

  const res = await request(app)
    .put(`/directors/${directorId}`)
    .send(directorUpdated);

  expect(res.status).toBe(200);
  expect(res.body.firstName);
});

test("DELTE /directors should delete a selected director", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);

  expect(res.status).toBe(204);
});
