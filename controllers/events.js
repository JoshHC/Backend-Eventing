import { response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Event from '../models/Event.js';
let events = []

export const getEvents = async (req, res) => {

    try {
        const events = await Event.find();
        res.json(events).sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getEvent = async (req, res) => {
    res.json(res.event);
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
}

export const deleteEvent = async (req, res) => {

    try {
        await res.event.remove();
        res.json({ message: "Event Deleted" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const updateEvent = async (req, res) => {

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

    try {
        const updatedEvent = await res.event.save();
        res.json(updateEvent).sendStatus(204);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}