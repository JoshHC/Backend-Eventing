import { v4 as uuidv4 } from 'uuid';
import eventsrepository from '../repositories/events.repositories.js'
import client from '../helpers/init_redis.js'

let events = []

export const getEvents = async (req, res) => {
    try {
        let events;
        client.exists('All', async function (err, reply) {
            if (reply == 1) {
                client.get('All', function (err, reply) {
                    events = JSON.parse(reply);
                    console.log("Registers send by Redis");
                    res.status(200).json(events);
                })
            } else {
                events = await eventsrepository.getEvents();
                client.set('All', JSON.stringify(events), function (err, reply) {
                    console.log("Registers inserted in Redis");
                })
                setTimeout(() => {
                    console.log("Waiting response for BDD")
                    res.status(200).json(events);
                }, 200)

            }
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getEvent = async (req, res) => {
    res.status(200).json(res.event);
}

export const createEvent = async (req, res) => {
    const event = {
        id: uuidv4(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        inicio: req.body.inicio,
        fin: req.body.fin,
        boletos: req.body.boletos,
        fotografia: req.body.fotografia,
        ubicacion: req.body.ubicacion
    }
    try {
        const newEvent = await eventsrepository.createEvent(event);
        client.exists('All', function (err, reply) {
            if (reply == 1) {
                client.del('All');
            }
        })
        return res.send(`Event with the following name: ${newEvent.nombre} inserted`);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

export const deleteEvent = async (req, res, next) => {
    try {
        await eventsrepository.deleteEvent(res);
        client.exists(req.params.id, function (err, reply) {
            if (reply == 1) {
                client.del('All');
                client.del(req.params.id);
                console.log("Register deleted from Redis")
            }
        })
        return res.status(200).json({ message: "Event Deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const updateEvent = async (req, res) => {
    try {
        console.log(res.event)
        const updatedEvent = await eventsrepository.updateEvent(req, res);
        client.exists(req.params.id, function (err, reply) {
            if (reply == 1) {
                client.del('All');
                client.set(req.params.id, JSON.stringify(updateEvent), function (err, reply) {
                    console.log("Register updated in redis");
                })
            }
        })
        console.log(updatedEvent);
        return res.status(204).send();
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}