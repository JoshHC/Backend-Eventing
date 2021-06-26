import express from 'express';
import eventsrepository from '../repositories/events.repositories.js'
import { createEvent, getEvent, getEvents, deleteEvent, updateEvent } from '../controllers/eventscontroller.js';

const router = express.Router();

router.get('/', getEvents);

router.post('/', createEvent);

router.get('/:id', eventsrepository.getEventFunction, getEvent);

router.delete('/:id', eventsrepository.getEventFunction, deleteEvent);

router.patch('/:id', eventsrepository.getEventFunction, updateEvent);

export default router;
