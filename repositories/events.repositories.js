import Event from '../models/Event.js';

const createEvent = async (newEvent) => {
    const event = new Event(newEvent)
    return await event.save();
}

const getEvents = async () => {
    return await Event.find();
}

const deleteEvent = async (res) => {
    return await res.event.remove();
}

const updateEvent = async (req, res) => {

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

    return res.event.save();
}

const eventsrepository = {
    createEvent, getEvents, deleteEvent, updateEvent, getEventFunction
}

async function getEventFunction(req, res, next) {
    let event;
    try {
        event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: "Cannot find Event" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.event = event
    next()
}

export default eventsrepository