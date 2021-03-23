import { response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Event from '../models/Event.js';
let events = []

export const getEvents = async (req, res) => {

    try {
        const events = await Event.find();
        res.json(events);
        //console.log(events);
        //res.send(events);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getEvent = async (req, res) => {

    const response = await getEventFunction(req, res);
    res.json(response);
    //const { id } = req.params;
    //const foundevent = events.find((event) => event.id == id);
    /*if (foundevent != undefined) {
        res.send(foundevent);
    }
    else {
        res.sendStatus(404);
    }*/
}

export const createEvent = async (req, res) => {
    const event = new Event({
        id: uuidv4(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        inicio: req.body.inicio,
        fin: req.body.fin,
        boletos: req.body.boletos,
        fotografia: req.body.fotografia,
        ubicacion: req.body.ubicacion
    })

    try {
        const newEvent = await event.save();
        res.send(`Event with the following name: ${event.nombre} inserted`);
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    //const event = req.body;
    //events.push({ id: uuidv4(), ...event });
    //res.sendStatus(201);
}

export const deleteEvent = async (req, res) => {

    try {  
        const { id } = req.params;
        await Event.remove({id: id});
        res.json({message: "Event Deleted"});

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    /*const { id } = req.params;
    events = events.filter((event) => event.id !== id);
    if (events != undefined) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }*/

}

export async function getEventFunction(req, res) {
    let event;
    try {
        event = await Event.find({ id: req.params.id })
        if (event == null) {
            return res.status(404).json({ message: "Cannot find Event" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    return event;
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