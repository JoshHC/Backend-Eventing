import express from 'express';
import bodyParser from 'body-parser';
import eventsRoutes from './routes/events.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

const app = express();
const PORT = 5000;

dotenv.config()
mongoose.connect(process.env.Database_URL, {useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', ()=> console.log('Connected to Database'));

app.use(bodyParser.json()); 

app.use('/events', eventsRoutes) ;

app.get('/', (req, res)=> res.send('Laboratorio de Node Js con Express'));

app.listen(PORT, () => console.log(`Server Running on port: http:localhost:${PORT}`));