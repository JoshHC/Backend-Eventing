import express from 'express';
import eventsrepository from '../repositories/events.repositories.js'
import Authenticate from '../middleware/authenticate.js';
import { createEvent, getEvent, getEvents, deleteEvent, updateEvent } from '../controllers/eventscontroller.js';

const router = express.Router();

router.get('/', getEvents);

router.post('/', createEvent);

router.get('/:id', eventsrepository.validateredis, getEvent);

router.delete('/:id', eventsrepository.validateredis, deleteEvent);

router.patch('/:id', eventsrepository.validateredis, updateEvent);

export default router;
