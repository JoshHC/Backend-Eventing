import express from 'express';
import {createEvent, getEvent, getEvents, deleteEvent, updateEvent} from '../controllers/events.js';

const router = express.Router();

router.get('/', getEvents);

router.post('/', createEvent);

router.get('/:id', getEvent)

router.delete('/:id', deleteEvent);

router.patch('/:id', updateEvent);

export default router;