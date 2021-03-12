import { v4 as uuidv4 } from 'uuid';

let events = []

export const getEvents = (req,res) => {
    console.log(events);
    res.send(events);
} 

export const getEvent = (req,res) => {
    const { id } = req.params;
    const foundevent = events.find((event) => event.id == id);
    res.send(foundevent);
}

export const createEvent = (req, res) => {
    const event = req.body;
    events.push({id: uuidv4(), ...event});
    res.send(`Event with the following name: ${event.nombre} inserted`);
}

export const deleteEvent = (req,res) => {
    const { id } = req.params;
    events = events.filter((event) => user.id =! id);
    res.send(`Event with the id: ${id} deleted`)
}

export const updateEvent = (req,res) => {
    const { id } = req.params;
    const {nombre, ubicacion} = req.body;

    const event = events.find((event) => event.id == id);

    if(nombre) event.nombre = nombre;

    if(ubicacion) event.ubicacion = ubicacion;

    res.send(`Event with the id: ${id} updated`)
}