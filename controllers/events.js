import { v4 as uuidv4 } from 'uuid';

let events = []

export const getEvents = (req, res) => {
    console.log(events);
    res.send(events);
    res.sendStatus(200);
}

export const getEvent = (req, res) => {
    const { id } = req.params;
    const foundevent = events.find((event) => event.id == id);
    if (foundevent != undefined) {
        res.send(foundevent);
    }
    else {
        res.sendStatus(404);
    }
}

export const createEvent = (req, res) => {
    const event = req.body;
    events.push({ id: uuidv4(), ...event });
    res.sendStatus(201);
    res.send(`Event with the following name: ${event.nombre} inserted`);
}

export const deleteEvent = (req, res) => {
    const { id } = req.params;
    events = events.filter((event) => event.id !== id);
    if (events != undefined) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }

}

export const updateEvent = (req, res) => {
    const { id } = req.params;
    const { nombre, ubicacion } = req.body;

    const event = events.find((event) => event.id == id);
    if (event != undefined) {
        if (nombre) event.nombre = nombre;
        if (ubicacion) event.ubicacion = ubicacion;
        console.log(nombre, ubicacion);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}