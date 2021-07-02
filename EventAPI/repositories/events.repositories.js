import dynamoClient from '../config/db.js'

const createEvent = async (newEvent) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: newEvent
    }
    return dynamoClient.put(params).promise();
}

const getEvents = async () => {
    //get Events
    const params = {
        TableName: process.env.TABLE_NAME       
    }
    const events = await dynamoClient.scan(params).promise();
    return events.Items;
}

const deleteEvent = async (id) => {
    try {
        // const id = req.params.id;
        const params = {
            TableName: process.env.TABLE_NAME,
            Key:{
                id
            }
        }
        return  await dynamoClient.delete(params).promise();
    } catch (err) {
        return console.log(err.message);
    }
}

const updateEvent = async (req, res) => {

    try {
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
        return await createEvent(res.event);
    } catch (ex) { return console.log(ex) }
    
}

const eventsrepository = {
    createEvent, getEvents, deleteEvent, updateEvent, getEventFunction
}

async function getEventFunction(req, res, next) {
    let event;
    try {
        const id = req.params.id;
        const params = {
            TableName: process.env.TABLE_NAME,
            Key:{
                id
            }
        }
        event = await dynamoClient.get(params).promise()
        if (event.Item == null) {
            return res.status(404).json({ message: "Cannot find Event" })
        }else {
            res.event = event.Item
            next()
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export default eventsrepository