import { v4 as uuidv4 } from 'uuid';
import eventsrepository from '../repositories/events.repositories.js'
import http  from 'http'; 

let events = []

export const getEvents = async (req, res) => {
    try {
        let events;
        events = await eventsrepository.getEvents();   
        res.status(200).json(events);
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
        return res.send(`Event with the following name: ${event.nombre} inserted`);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;        
        const data = await eventsrepository.deleteEvent(id);
        return res.status(200).json({ message: "Event Deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await eventsrepository.updateEvent(req, res);

        return res.status(204).json({ message: "Event Updated" });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}