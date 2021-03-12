import express from 'express';

const router = express.Router();

const events = [
    {
        "nombre": "Coldplay Concert",
        "Ubicación": "Ciudad Cayala"
    }
]

router.get('/', (req,res) => {
    console.log(events);
} );

router.post('/', (req, res) => {

});

export default router;