import express from 'express';
import Event from '../models/Event.js';
import { createEvent, getEvent, getEvents, deleteEvent, updateEvent } from '../controllers/events.js';

const router = express.Router();

router.get('/', getEvents);

router.post('/', createEvent);

router.get('/:id', getEventFunction, getEvent)

router.delete('/:id', getEventFunction, deleteEvent);

router.patch('/:id', getEventFunction, updateEvent);

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

export default router;
