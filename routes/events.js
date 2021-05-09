import express from 'express';
import eventsrepository from '../repositories/events.repositories.js'
import Authenticate from '../middleware/authenticate.js';
import { createEvent, getEvent, getEvents, deleteEvent, updateEvent } from '../controllers/eventscontroller.js';

const router = express.Router();

router.get('/', Authenticate, getEvents);

router.post('/', Authenticate, createEvent);

router.get('/:id', Authenticate, eventsrepository.validateredis, getEvent);

router.delete('/:id', Authenticate, eventsrepository.validateredis, deleteEvent);

router.patch('/:id', Authenticate, eventsrepository.validateredis, updateEvent);

export default router;
