import { expect } from 'chai'
import sinon from 'sinon'
import 'mocha'
import eventsrepository from '../repositories/events.repositories.js'
import { deleteEvent } from '../controllers/eventscontroller.js';

describe("EventsController", function () {
  describe("deleteEvent", function () {

    let status, json, req, res, body, send
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      send = sinon.spy();
      res = { json, status, send };
      status.returns(res);
    });

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

    req =
    {
      params: { id: '607269f4d43db4641aea76cb' }
    }
    
    it("should delete an specific event", async function () {
      const stub = sinon.stub(eventsrepository, "deleteEvent").returns(stubValue)
      await deleteEvent(res)
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200)
      stub.restore()
    });
  });
});