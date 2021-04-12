import { expect } from 'chai'
import sinon from 'sinon'
import eventsrepository from '../repositories/events.repositories.js'
import 'mocha'
import { createEvent } from '../controllers/eventscontroller.js';

describe("EventsController", function () {
  describe("CreateEvent", function () {

    let status, json, req, res, body, send
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      send = sinon.spy();
      res = { json, status, send };
      status.returns(res);
    });

    body = {
        id: "7758c080-c08e-42fa-998e-486ea7c1265f",
        nombre: "Imagine Dragons",
        descripcion: "A Marvelous concert of Imagine Dragons of two days",
        inicio: "22/03/2021 10:55",
        fin: "23/03/2021 14:00",
        boletos: "100",
        fotografia: "This is a photo path of test",
        ubicacion: "Explanada Cayala",
        __v: 0
    };

    const stubValue = {
        _id: "607269f4d43db4641aea76cb",
        id: "7758c080-c08e-42fa-998e-486ea7c1265f",
        nombre: "Imagine Dragons",
        descripcion: "A Marvelous concert of Imagine Dragons of two days",
        inicio: "22/03/2021 10:55",
        fin: "23/03/2021 14:00",
        boletos: "100",
        fotografia: "This is a photo path of test",
        ubicacion: "Explanada Cayala",
        __v: 0
    };

    req = { body }
    it("should add a new event", async function () {
      const stub = sinon.stub(eventsrepository, "createEvent").returns(stubValue)
      await createEvent(req, res)
      expect(status.calledOnce).to.be.true;
      expect(json.args[0][0]['_id']).to.be.not.undefined
      expect(send.args[0][0]).to.be.equal("Event with the following name: Imagine Dragons inserted")
      expect(json.args[0][0]['_id']).to.be.not.null
      expect(status.args[0][0]).to.equal(201)
      stub.restore()
    });

    body = {
        _id: "607269f4d43db4641aea76cb",
        id: "7758c080-c08e-42fa-998e-486ea7c1265f",
        descripcion: "A Marvelous concert of Imagine Dragons of two days",
        inicio: "22/03/2021 10:55",
        fin: "23/03/2021 14:00",
        boletos: "100",
        fotografia: "This is a photo path of test",
        ubicacion: "Explanada Cayala",
        __v: 0
    };

    req = { body }
    it("shouldn't add a new event because of missing name", async function () {
      const stub = sinon.stub(eventsrepository, "createEvent").callsFake(() => {
        throw new Error("Event validation failed: nombre: Path `nombre` is required.")
      })
      await createEvent(req, res)
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400)
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.be.equal("Event validation failed: nombre: Path `nombre` is required.");
      stub.restore()
    });
  });
});




























// describe("moviesController", function () {
//   describe("createMovie", function () {
//     const body = {
//       title: faker.lorem.words(),
//       description: faker.lorem.paragraph(),
//       img: faker.image.imageUrl(),
//       stars: (Math.floor(Math.random() * (5 - 1)) + 1),
//       director: faker.lorem.words(),
//       contentType: aker.lorem.word(),
//     };

//     let req, res, json, status;
//     beforeEach(() => {
//       req = { body }
//       json = sinon.spy();
//       status = sinon.stub();
//       res = { json, status };
//       status.returns(res)
//     });
//     it("should add a new movie", async function () {
//       const movie = await moviesController.createMovie(req, res);
//       expect(movie.status).to.be.be.equal(201);
//     });
//   });
// });





























// describe("moviesController", function () {

//   let req;
//   let res;
//   let movieService;
//   this.beforeEach

//   const stubValue = {
//     id: faker.random.uuid(),
//     title: faker.lorem.words(),
//     description: faker.lorem.paragraph(),
//     img: faker.image.imageUrl(),
//     stars: (Math.floor(Math.random() * (5 - 1)) + 1),
//     director: faker.lorem.words(),
//     contentType: aker.lorem.word(),
//   };
//   describe("create", function () {
//     it("should add a new movie to the db", async function () {
//       const stub = sinon.stub(moviesController, "createMovie").returns(stubValue);
//       const movie = await moviesController.createMovie(stubValue.name, stubValue.email);
//       expect(stub.calledOnce).to.be.true;
//       expect(user.id).to.equal(stubValue.id);
//       expect(user.name).to.equal(stubValue.name);
//       expect(user.email).to.equal(stubValue.email);
//       expect(user.createdAt).to.equal(stubValue.createdAt);
//       expect(user.updatedAt).to.equal(stubValue.updatedAt);
//     });
//   });
// });