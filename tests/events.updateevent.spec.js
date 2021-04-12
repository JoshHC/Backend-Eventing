import { expect } from 'chai'
import sinon from 'sinon'
import eventsrepository from '../repositories/events.repositories.js'
import 'mocha'
import { updateEvent } from '../controllers/eventscontroller.js';

describe("EventsController", function () {
    describe("updateEvent", function () {

        let status, json, req, res, body, send
        beforeEach(() => {
            status = sinon.stub();
            json = sinon.spy();
            send = sinon.spy();
            res = { json, status, send };
            status.returns(res);
        });

        req = {
            params: {
                id: '7758c080-c08e-42fa-998e-486ea7c1265f'
            },
            body:{
                nombre: "Imagine Dragons Test",
                descripcion: "A Marvelous concert of Imagine Dragons of two days Test",
            }
        }

        const stubValue = {
            _id: "607269f4d43db4641aea76cb",
            id: "7758c080-c08e-42fa-998e-486ea7c1265f",
            nombre: "Imagine Dragons Test",
            descripcion: "A Marvelous concert of Imagine Dragons of two days Test",
            inicio: "22/03/2021 10:55",
            fin: "23/03/2021 14:00",
            boletos: "100",
            fotografia: "This is a photo path of test",
            ubicacion: "Explanada Cayala",
            __v: 0
        };

        it("should update a specific event", async function () {
            const stub = sinon.stub(eventsrepository, "updateEvent").returns(stubValue)
            await updateEvent(req, res)
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(204)
            stub.restore()
        });

        req = {
            params: {
                id: '7758c080-c08e-42fa-58776-486ea7c1265f'
            },
            body:{
                nombre: "Imagine Dragons Test",
                descripcion: "A Marvelous concert of Imagine Dragons of two days Test",
            }
        }

        it("shouldn't modify the event because dont exist", async function () {
            const stub = sinon.stub(eventsrepository, "updateEvent").callsFake(() => {
                throw new Error("Cannot find Event")
            })
            await updateEvent(req, res)
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(400)
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].message).to.be.equal("Cannot find Event");
            stub.restore()
        });
    });
});