import { expect } from 'chai'
import sinon from 'sinon'
import eventsrepository from '../repositories/events.repositories.js'
import 'mocha'
import { getEvents } from '../controllers/eventscontroller.js';

describe("EventsController", function () {
  describe("getEvents", function () {

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
    it("should get events", async function () {
      const stub = sinon.stub(eventsrepository, "getEvents").returns(stubValue)
      await getEvents(req, res)
      expect(status.calledOnce).to.be.true;
      expect(json.args[0][0]['_id']).to.be.not.undefined
      expect(json.args[0][0]['_id']).to.be.not.null
      expect(status.args[0][0]).to.equal(200)
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
    it("shouldn't get and event because an error of connection", async function () {
      const stub = sinon.stub(eventsrepository, "getEvents").callsFake(() => {
        throw new Error("Internal Server Error")
      })
      await getEvents(req, res)
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(500)
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.be.equal("Internal Server Error");
      stub.restore()
    });
  });
});




