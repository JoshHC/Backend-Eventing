import express from 'express';
import bodyParser from 'body-parser';
import eventsRoutes from './routes/events.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import client from './helpers/init_redis.js';

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,access-token, Authorization");
    next();
})

dotenv.config()
//Connection to Mongo Atlas DB
mongoose.connect(process.env.Database_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.json());

app.use('/events', eventsRoutes);

app.get('/', (req, res) => res.send('Event Service - Laboratorio de Node Js con Express'));

app.listen(PORT, () => console.log(`Server Running on port: http:localhost:${PORT}`));