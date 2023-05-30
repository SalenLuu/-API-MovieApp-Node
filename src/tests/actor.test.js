const request = require("supertest");
const app = require("../app");
const { expectCt } = require("helmet");

require("../models");

let actorId;

test("POST /actors should add an actor", async () => {
  const actor = {
    firstName: "Uma",
    lastName: "Thurman",
    nationality: "American",
    image:
      "https://resizing.flixster.com/YuFaMNMFkOYt03zCvIEeVwKjxh4=/218x280/v2/https://flxt.tmsimg.com/assets/79244_v9_ba.jpg",
    birthday: "1970-05-29",
  };
  const res = await request(app).post("/actors").send(actor);
  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /actors should return all actors", async () => {
  const res = await request(app).get("/actors");

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('/PUT /actors should update actor"s info', async () => {
  const actorUpdated = {
    firstName: "Uma updated",
  };

  const res = await request(app).put(`/actors/${actorId}`).send(actorUpdated);

  expect(res.status).toBe(200);
  expect(res.body.firstName);
});

test("DELETE /actors/:id should delete an especific actor", async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
});
