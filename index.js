import express from 'express';
import bodyParser from 'body-parser';

import eventsRoutes from './routes/events.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json()); 

app.use('/events', eventsRoutes) 

app.get('/', (req, res)=> res.send('Laboratorio de Node Js con Express'));

app.listen(PORT, () => console.log(`Server Running on port: http:localhost:${PORT}`));