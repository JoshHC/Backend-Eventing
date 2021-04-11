import { expect } from 'chai'
import chai from 'chai'
import { event } from '../Event.js'


describe("POST /getEvent", () => {

    it("should return status 200", async () => {
        let res = await chai
            .request(app)
            .post('/dogs')
            .send({ name: "Charlie", age: "9", breed: "Pomerian" })

        expect(res.status).to.equal(200)

    })

    afterEach(async () => {
        await Dog.deleteOne({ name: "Charlie" })
    })
})

describe("POST /getEvent", () => {

    beforeEach(() => {
        loggedInStub = sinon.stub()
    })

    it("should return status 200", async () => {
        let res = await chai
            .request(app)
            .post('/dogs')
            .send({ name: "Charlie", age: "9", breed: "Pomerian" })

        expect(res.status).to.equal(200)

    })

    afterEach(() => {
        await Dog.deleteOne({ name: "Charlie" })
        loggedInStub.restore()
    })
})