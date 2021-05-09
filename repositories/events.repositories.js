import Event from '../models/Event.js';
import client from '../helpers/init_redis.js'

const createEvent = async (newEvent) => {
    const event = new Event(newEvent)
    return await event.save();
}

const getEvents = async () => {

    return await Event.find();
}

const deleteEvent = async (res) => {
    try {
        return await res.event.remove();
    } catch (error) {
        return console.log(error);
    }
}

const updateEvent = async (req, res) => {

    try {
        if (req.body.nombre != null) {
            res.event.nombre = req.body.nombre;
        }
        if (req.body.descripcion != null) {
            res.event.descripcion = req.body.descripcion;
        }
        if (req.body.inicio != null) {
            res.event.inicio = req.body.inicio;
        }
        if (req.body.fin != null) {
            res.event.fin = req.body.fin;
        }
        if (req.body.boletos != null) {
            res.event.boletos = req.body.boletos;
        }
        if (req.body.fotografia != null) {
            res.event.fotografia = req.body.fotografia;
        }
        if (req.body.ubicacion != null) {
            res.event.ubicacion = req.body.ubicacion;
        }
    } catch (ex) { return console.log(ex) }
    return res.event.save();
}

const eventsrepository = {
    createEvent, getEvents, deleteEvent, updateEvent, getEventFunction, validateredis
}


function validateredis(req, res, next) {
    let event;
    client.exists(req.params.id, function (err, reply) {
        if (reply == 1) {
            client.get(req.params.id, function (err, reply) {
                console.log('Exists already in Redis')
                res.event = JSON.parse(reply)
                next();
            })
        }
        else {
            getEventFunction(req, res, next);
        }
    })
}

async function getEventFunction(req, res, next) {
    let event;
    try {
        event = await Event.findOne({ id: req.params.id });
        if (event == null) {
            return res.status(404).json({ message: "Cannot find Event" })
        }
        else {
            client.set(req.params.id, JSON.stringify(event), function (err, reply) {
                console.log("Not exists in Redis, adding to Redis...");
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.event = event
    next()
}


export default eventsrepository